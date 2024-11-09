import { BaseTask, ITask } from "@Typing/Task";
import { ITaskRunner } from "./ITaskRunner";
import { MessageBroker } from 'MessageBroker/MessageBroker'
export abstract class BaseTaskRunner implements ITaskRunner {
    private _isRunning: boolean = false;
    private task: BaseTask  | null = null;
    private taskCompleteCallback: any = (taskID: ITask) => {};

    get TaskCompleteCallback(): any {
        return this.taskCompleteCallback;
    }

    set TaskCompleteCallback(callback: any) {
        this.taskCompleteCallback = callback;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    set isRunning(value: boolean) {
        this._isRunning = value;
    }
    
    constructor() {
        // Intended to be blank
    }

    busy = (): boolean => {
        return this.isRunning;
    }

    abstract run: <T,>(task: any) => Promise<any>;
}