import { IDBManipulator, QAFormatData } from "@Database/index";
import { ITaskManager } from "@TaskManager/ITaskManager"

export class DatabaseQueryService {
    dbManipulator: IDBManipulator;
    router: any;

    constructor(dbManipulator: IDBManipulator) {
        this.dbManipulator = dbManipulator;
        const express = require('express');
        this.router = express.Router();
        this.router.get(`/getData`, this.getData.bind(this));
    }

    public getExposeServiceRouter() {
        return this.router;
    }

    public setDatabaseManipulator(dbManipulator: IDBManipulator): void {
        this.dbManipulator = dbManipulator;
    }

    public async getData(request: any, response: any) {
        /* TODO
        *  Query based on request table, and provide access to different 
        *  database by different database manipulator. 
        */
        let readDataFormat: QAFormatData[];
        readDataFormat = await this.dbManipulator.readFormattedData("stackoverflow") as QAFormatData[];
        const resultData = readDataFormat
            .map((data) => { return data.getFormatData();})
            .map((data) => { return Object.fromEntries(data);});

        response.status(200).json(resultData);
    }

    public async addTask(request: any, response: any) {
        try {   
            let object = request.body;
            console.log('add task: ', object);
            console.log('task name: ', object['taskName']);
             
            response.status(200);
        }
        catch (err) {
            return false;   
        }
        response.status(200);
    }

}
