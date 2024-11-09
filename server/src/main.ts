//import 'module-alias/register';
require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
import { getStringPair, createStringPair, deleteStringPair } from './queries'
import { collectPage } from './Services/CollectService'
import { TaskManagementService } from '@Services/TaskManagementService';
import { WebCollectTaskManager } from '@TaskManager/WebCollectTaskManager';
import { WebCollectRunner, AutoStorageTaskRunnerDecorator } from '@TaskRunner/index';
import { MessageBroker } from '@MessageBroker/index';
import { QueueTaskWrapper } from '@TaskRunner/TaskQueueRunner';
import { WebCollectTask } from '@Typing/Task';
import { QADatabaseManipulator } from '@Database/qa-database-manipulator';
import { QAFormatData } from './Database';
import { DatabaseQueryService } from '@Services/DatabaseQueryService';

const path = require('path');
const cors = require("cors");
const app = express();
const restfulPort = 5000;
const socketPort = 5001;
const http = require("http").Server(app);
const amqplib = require('amqplib');

const exchange_name = "Tasks";
const routing_key = "Normal";
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'qadatabase',
    password: '123456',
    port: 5432
})


const setupExpressApp = (app: any): void => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.use(express.json())
    app.use(bodyParser.json())

    app.get('/', (request: any, response: any) => {
        console.log(__dirname)
        var options = {
            root: path.join(__dirname)
        };
        //response.json({info: 'English'})
        response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    })
}

const appStartUp = async () => {
    const messageBroker = await MessageBroker.create();
    await messageBroker.createMessageExchange("crawl-web-data");
    const text = {
        item_id: "macbook",
        text: "This is a sample message to send receiver to check the ordered Item Availablility",
    };

    app.use(cors({ origin: '*' }));
    /*
    const socketIO = require('socket.io')(http, {
        cors: {
        origin: '*',
        }
    });
    */

    setupExpressApp(app);
    const qADatabaseManipulator = new QADatabaseManipulator(pool);
    let databaseQueryService: DatabaseQueryService = new DatabaseQueryService(qADatabaseManipulator);
    let databaseQueryServiceRouter = databaseQueryService.getExposeServiceRouter();

    const exchangeName = "Tasks";
    const routingKey = "Normal";
    const webCollectManager = new WebCollectTaskManager();
    // Register task publisher
    let taskPublisher = messageBroker.createTaskPublisher(exchangeName, routingKey)
    webCollectManager.setTaskPublisher(taskPublisher);

    const webCollectTaskManagementService = new TaskManagementService();
    webCollectTaskManagementService.setTaskManager(webCollectManager);
    let webCollectServiceRouter = webCollectTaskManagementService.getExposeServiceRouter();

    var webCollectRunnerGroup: QueueTaskWrapper<WebCollectTask>[] = [];
    for (const i of Array(2).keys()) {
        console.log(i)
        let taskRunner: WebCollectRunner = new WebCollectRunner();

        const formatProccessor: QAFormatData = new QAFormatData();
        let autoStorageTaskRunner =
            new AutoStorageTaskRunnerDecorator(taskRunner,
                qADatabaseManipulator,
                "stackoverflow",
                formatProccessor);
        let taskQueueWrapper: QueueTaskWrapper<WebCollectTask> = new QueueTaskWrapper<WebCollectTask>(autoStorageTaskRunner);
        let createTaskConsumer = messageBroker.createTaskConsumer(exchangeName, routingKey);
        taskQueueWrapper.setTaskConsumer(createTaskConsumer);
        taskQueueWrapper.startConsumeTasks();
        taskQueueWrapper.TaskCompleteCallback = webCollectManager.markTaskCompleted;
        // webCollectRunnerGroup.push(new AutoStorageTaskRunnerWrapper());
        webCollectRunnerGroup.push(taskQueueWrapper);
    }

    // webCollectRunnerGroup.map((runner) => webCollectManager.subscribe(runner));

    app.use('/WebCollectTaskManagementService/', webCollectServiceRouter);
    app.use('/DatabaseQueryService/', databaseQueryServiceRouter);
    const registerCollectService = (app: any): void => {
        app.get('/collectPage', collectPage);
    }

    const registerWebCollectTaskManagementService = (app: any, taskManagementService: TaskManagementService): void => {
        app.get(`/getTasks`, taskManagementService.getTasks.bind(taskManagementService));
        app.get(`/addTask`, taskManagementService.addTask.bind(taskManagementService));
    }

    const registerDBManagementService = (app: any): void => {
        app.get('/getStringPair', getStringPair);
        app.get('/createStringPair', createStringPair);
        app.get('/deleteStringPair', deleteStringPair);
    }

    registerWebCollectTaskManagementService(app, webCollectTaskManagementService)
    registerDBManagementService(app);
    registerCollectService(app);

    /*
    socketIO.on('connection', (socket: any) => {
        console.log(`${socket.id} has connected.`)
        socket.on('disconnect', () => {
            console.log(`${socket.id} has disconnected.`)
            socket.disonnect();
        })
        socket.on('AddTask', (data: any) => {
            let taskData = {
                taskName: data.taskname,
                content: data.content,
            }
            //webCollectTaskManagementService.addTask(taskData.taskName, taskData.content);
        })
    })

    http.listen(socketPort, () => {
        console.log(`Server listening on ${socketPort}`);
    });
    */

    app.listen(restfulPort, () => {
        console.log(`App running on port ${restfulPort}.`)
    });

}

appStartUp();