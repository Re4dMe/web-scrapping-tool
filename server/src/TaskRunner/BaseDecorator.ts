import { ITaskRunner } from './ITaskRunner'
export class BaseDecorator implements ITaskRunner {
    protected taskRunner: ITaskRunner;

    get isRunning(): boolean {
        return this.taskRunner.busy();
    }

    constructor(taskRunner: ITaskRunner) {
        this.taskRunner = taskRunner;
    }
    
    public busy = (): boolean => {
        return this.taskRunner.busy();
    }

    public run = async <T>(task: any): Promise<T> => {
        return this.taskRunner.run(task);
    }
}