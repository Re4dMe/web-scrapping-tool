"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoStorageTaskRunnerDecorator = void 0;
const BaseDecorator_1 = require("./BaseDecorator");
class AutoStorageTaskRunnerDecorator extends BaseDecorator_1.BaseDecorator {
    dbManipulator;
    formatProccessor;
    dbDataFormat;
    pool;
    tableName;
    // private storageObject: null;
    constructor(taskRunner, dbManipulator, tableName, formatProccessor) {
        super(taskRunner);
        this.tableName = tableName;
        this.dbManipulator = dbManipulator;
        this.formatProccessor = formatProccessor;
    }
    assignTaskRunner(taskRunner) {
        this.taskRunner = taskRunner;
        return true;
    }
    run = async (task) => {
        let dataList = await this.taskRunner.run(task);
        // process data
        // write processed data to db
        /* TODO
        *  Refactor the code of Format Processor.
        */
        dataList.map((data) => {
            this.formatProccessor.parseData(data);
            this.dbManipulator.createFormattedData(this.tableName, this.formatProccessor);
        });
        return new Promise((resolve) => { resolve(dataList); });
    };
    busy = () => {
        if (this.taskRunner.busy())
            return true;
        else
            return false;
    };
    updateByNotification(task) {
        // this.taskRunner.busy = true;
        if (task != undefined)
            return this.run(task);
        return new Promise(() => { return "OK"; });
    }
}
exports.AutoStorageTaskRunnerDecorator = AutoStorageTaskRunnerDecorator;
