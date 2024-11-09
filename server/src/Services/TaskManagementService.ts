import { ITaskManager } from "@TaskManager/ITaskManager"

export class TaskManagementService {
    taskManager: ITaskManager | null = null;
    router: any;

    constructor(taskManager: ITaskManager | null = null) {
        this.taskManager = taskManager;    
        const express = require('express');
        this.router = express.Router();
        this.router.post(`/addTask`, this.addTask.bind(this));
        this.router.get(`/getTasks`, this.getTasks.bind(this));
    }

    public getExposeServiceRouter() {
        return this.router;
        /*
        socket.on('connection', (socket: any) => {
            console.log(`In bindSocket: ${socket.id} has connected.`)
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
            socket.on('GetTasks', () => {
                socket.send('get tasks.');
            })
        })
        */
    }

    public setTaskManager(taskManager: ITaskManager): void {
        this.taskManager = taskManager;
    }

    public async getTasks(request: any, response: any) {
        if (this.taskManager === null) return null;
        const tasks = this.taskManager.getTasks();
        response.status(200).json(tasks);
    }

    public async addTask(request: any, response: any) {
        try {   
            let object = request.body;
            console.log('add task: ', object);
            console.log('task name: ', object['taskName']);
            if (this.taskManager == null) return false;
            this.taskManager.addTask("1", object['taskName'], object['content']);
            response.status(200);
        }
        catch (err) {
            return false;   
        }
        response.status(200);
    }

}
