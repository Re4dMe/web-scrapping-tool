import { BaseTaskRunner } from "./BaseTaskRunner";
import { MessageBroker, CreateTaskConsumerType } from 'MessageBroker/MessageBroker'
import { ITaskRunner } from "./ITaskRunner";

export class QueueTaskWrapper<TaskType> extends BaseTaskRunner{
    taskRunner: ITaskRunner;
 
    startTaskConsumer: CreateTaskConsumerType =
        async (message) => {
            console.log("Task publisher not initialized.");
        };

    constructor(taskRunner: ITaskRunner) {
        super();
        this.taskRunner = taskRunner;
    }

    busy = (): boolean => {
        return this.isRunning;
    }

    public setTaskConsumer = (func: CreateTaskConsumerType) => {
        this.startTaskConsumer = func;
    }

    public startConsumeTasks = () => {
        let extractInfoAndRun = (message: any) => {
            let task: TaskType = this.extractTaskInfoFromAMQPMessage(message);
            this.run(task);
        }
        this.startTaskConsumer("crawl-web-data", extractInfoAndRun);
    }

    public extractTaskInfoFromAMQPMessage = (message: any) => {
        return JSON.parse(message.content.toString()) as TaskType;
    }

    run = async <T>(task: TaskType): Promise<any> => {
        console.log("run");
        await this.taskRunner.run(task);
        console.log("run2 task:", task);
 
        this.TaskCompleteCallback(task);
        return;
    }

}