import { ITaskRunner } from './ITaskRunner'
import { BaseDecorator } from './BaseDecorator'
import { WebCollectTask } from '@Typing/Task/index'
import { IDBManipulator } from '@Database/index' 
import { IAccessFormat } from "@Database/AccessFormat/index";
 

export class AutoStorageTaskRunnerDecorator extends BaseDecorator {
    private dbManipulator: IDBManipulator; 
    private formatProccessor: IAccessFormat;
    private dbDataFormat: any;
    private pool: any;
    private tableName: string;
    // private storageObject: null;

    constructor(taskRunner: ITaskRunner,
                dbManipulator: any, 
                tableName: string,
                formatProccessor: IAccessFormat) {
        super(taskRunner);
        this.tableName = tableName;
        this.dbManipulator = dbManipulator;
        this.formatProccessor = formatProccessor;
    }
    
    public assignTaskRunner(taskRunner: any): boolean {
        this.taskRunner = taskRunner;
        return true;        
    }

    public run = async <T>(task: WebCollectTask): Promise<any> => {
        let dataList: any = await this.taskRunner.run(task);
        // process data
        // write processed data to db
        /* TODO
        *  Refactor the code of Format Processor.
        */
        dataList.map((data: any) => {
            this.formatProccessor.parseData(data);
            this.dbManipulator.createFormattedData(this.tableName, this.formatProccessor);
        })
 
        return new Promise((resolve) => { resolve(dataList); });        
    }

    public busy  = (): boolean => {
        if (this.taskRunner.busy()) 
            return true;
        else 
            return false;
    }

    public updateByNotification(task: WebCollectTask): Promise<any> {
        // this.taskRunner.busy = true;
        if (task != undefined) return this.run(task);
        return new Promise(() => { return "OK"; });
    }
}