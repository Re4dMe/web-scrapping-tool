"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import 'module-alias/register';
require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const queries_1 = require("./queries");
const CollectService_1 = require("./Services/CollectService");
const TaskManagementService_1 = require("@Services/TaskManagementService");
const WebCollectTaskManager_1 = require("@TaskManager/WebCollectTaskManager");
const index_1 = require("@TaskRunner/index");
const index_2 = require("@MessageBroker/index");
const TaskQueueRunner_1 = require("@TaskRunner/TaskQueueRunner");
const qa_database_manipulator_1 = require("@Database/qa-database-manipulator");
const Database_1 = require("./Database");
const DatabaseQueryService_1 = require("@Services/DatabaseQueryService");
const path = require('path');
const cors = require("cors");
const app = express();
const restfulPort = 5000;
const socketPort = 5001;
const http = require("http").Server(app);
const amqplib = require('amqplib');
const exchange_name = "Tasks";
const routing_key = "Normal";
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'qadatabase',
    password: '123456',
    port: 5432
});
const setupExpressApp = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.use(express.json());
    app.use(bodyParser.json());
    app.get('/', (request, response) => {
        console.log(__dirname);
        var options = {
            root: path.join(__dirname)
        };
        //response.json({info: 'English'})
        response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
};
const appStartUp = async () => {
    const messageBroker = await index_2.MessageBroker.create();
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
    const qADatabaseManipulator = new qa_database_manipulator_1.QADatabaseManipulator(pool);
    let databaseQueryService = new DatabaseQueryService_1.DatabaseQueryService(qADatabaseManipulator);
    let databaseQueryServiceRouter = databaseQueryService.getExposeServiceRouter();
    const exchangeName = "Tasks";
    const routingKey = "Normal";
    const webCollectManager = new WebCollectTaskManager_1.WebCollectTaskManager();
    // Register task publisher
    let taskPublisher = messageBroker.createTaskPublisher(exchangeName, routingKey);
    webCollectManager.setTaskPublisher(taskPublisher);
    const webCollectTaskManagementService = new TaskManagementService_1.TaskManagementService();
    webCollectTaskManagementService.setTaskManager(webCollectManager);
    let webCollectServiceRouter = webCollectTaskManagementService.getExposeServiceRouter();
    var webCollectRunnerGroup = [];
    for (const i of Array(2).keys()) {
        console.log(i);
        let taskRunner = new index_1.WebCollectRunner();
        const formatProccessor = new Database_1.QAFormatData();
        let autoStorageTaskRunner = new index_1.AutoStorageTaskRunnerDecorator(taskRunner, qADatabaseManipulator, "stackoverflow", formatProccessor);
        let taskQueueWrapper = new TaskQueueRunner_1.QueueTaskWrapper(autoStorageTaskRunner);
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
    const registerCollectService = (app) => {
        app.get('/collectPage', CollectService_1.collectPage);
    };
    const registerWebCollectTaskManagementService = (app, taskManagementService) => {
        app.get(`/getTasks`, taskManagementService.getTasks.bind(taskManagementService));
        app.get(`/addTask`, taskManagementService.addTask.bind(taskManagementService));
    };
    const registerDBManagementService = (app) => {
        app.get('/getStringPair', queries_1.getStringPair);
        app.get('/createStringPair', queries_1.createStringPair);
        app.get('/deleteStringPair', queries_1.deleteStringPair);
    };
    registerWebCollectTaskManagementService(app, webCollectTaskManagementService);
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
        console.log(`App running on port ${restfulPort}.`);
    });
};
appStartUp();
