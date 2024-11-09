"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagementService = void 0;
class TaskManagementService {
    taskManager = null;
    router;
    constructor(taskManager = null) {
        this.taskManager = taskManager;
        const express = require('express');
        this.router = express.Router();
        this.router.post(`/addTask`, this.addTask.bind(this));
        this.router.get(`/getTasks`, this.getTasks.bind(this));
    }
    getExposeServiceRouter() {
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
    setTaskManager(taskManager) {
        this.taskManager = taskManager;
    }
    async getTasks(request, response) {
        if (this.taskManager === null)
            return null;
        const tasks = this.taskManager.getTasks();
        response.status(200).json(tasks);
    }
    async addTask(request, response) {
        try {
            let object = request.body;
            console.log('add task: ', object);
            console.log('task name: ', object['taskName']);
            if (this.taskManager == null)
                return false;
            this.taskManager.addTask("1", object['taskName'], object['content']);
            response.status(200);
        }
        catch (err) {
            return false;
        }
        response.status(200);
    }
}
exports.TaskManagementService = TaskManagementService;
