"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueTaskWrapper = void 0;
const BaseTaskRunner_1 = require("./BaseTaskRunner");
class QueueTaskWrapper extends BaseTaskRunner_1.BaseTaskRunner {
    taskRunner;
    startTaskConsumer = async (message) => {
        console.log("Task publisher not initialized.");
    };
    constructor(taskRunner) {
        super();
        this.taskRunner = taskRunner;
    }
    busy = () => {
        return this.isRunning;
    };
    setTaskConsumer = (func) => {
        this.startTaskConsumer = func;
    };
    startConsumeTasks = () => {
        let extractInfoAndRun = (message) => {
            let task = this.extractTaskInfoFromAMQPMessage(message);
            this.run(task);
        };
        this.startTaskConsumer("crawl-web-data", extractInfoAndRun);
    };
    extractTaskInfoFromAMQPMessage = (message) => {
        return JSON.parse(message.content.toString());
    };
    run = async (task) => {
        console.log("run");
        await this.taskRunner.run(task);
        console.log("run2 task:", task);
        this.TaskCompleteCallback(task);
        return;
    };
}
exports.QueueTaskWrapper = QueueTaskWrapper;
