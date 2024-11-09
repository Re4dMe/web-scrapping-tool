"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQueryService = void 0;
class DatabaseQueryService {
    dbManipulator;
    router;
    constructor(dbManipulator) {
        this.dbManipulator = dbManipulator;
        const express = require('express');
        this.router = express.Router();
        this.router.get(`/getData`, this.getData.bind(this));
    }
    getExposeServiceRouter() {
        return this.router;
    }
    setDatabaseManipulator(dbManipulator) {
        this.dbManipulator = dbManipulator;
    }
    async getData(request, response) {
        /* TODO
        *  Query based on request table, and provide access to different
        *  database by different database manipulator.
        */
        let readDataFormat;
        readDataFormat = await this.dbManipulator.readFormattedData("stackoverflow");
        const resultData = readDataFormat
            .map((data) => { return data.getFormatData(); })
            .map((data) => { return Object.fromEntries(data); });
        response.status(200).json(resultData);
    }
    async addTask(request, response) {
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
exports.DatabaseQueryService = DatabaseQueryService;
