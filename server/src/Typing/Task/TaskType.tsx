import { TaskStatus } from "./index";

export interface ITask {
    taskID: string;
    taskName: string;
}

export class BaseTask implements ITask {
    taskID: string = "";
    taskName: string = "";
    constructor (taskID: string, taskName: string) {
        this.taskID = taskID;
        this.taskName = taskName;
    }
}

export class WebCollectTask extends BaseTask {
    taskUrl: string = "";
    taskStatus?: TaskStatus;
};
