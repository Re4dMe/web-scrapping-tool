"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QADatabaseManipulator = void 0;
const index_1 = require("@Database/index");
class QADatabaseManipulator extends index_1.DataBaseManipulator {
    buildInsertCommand = (table, data) => {
        const extractedData = data.getStringFormatData();
        const columnNames = Array.from(extractedData.keys());
        const values = columnNames.map((key) => extractedData.get(key));
        let insertString;
        insertString = `INSERT INTO ${table} (${columnNames.join(',')}) VALUES (${values.join(',')})`;
        // console.log(`Insert command: ${insertString}`);
        return insertString;
    };
    buildQueryCommand = (table, data) => {
        try {
            const extractedData = data.getStringFormatData();
            const columnNames = Array.from(extractedData.keys());
            let insertString;
            insertString = `SELECT * FROM ${table}`;
            console.log(`Query command: ${insertString}`);
            return insertString;
        }
        catch (e) {
            console.log(e);
            return "";
        }
    };
    createFormattedData = async (tableName, data) => {
        const insertString = this.buildInsertCommand(tableName, data);
        this.create(insertString);
        console.log("create data complete");
        return true;
    };
    readFormattedData = async (tableName) => {
        let data = new index_1.QAFormatData();
        const queryString = this.buildQueryCommand(tableName, data);
        // let accessFormat: QAFormatData = new QAFormatData();
        console.log(`query_string: ${queryString}`);
        let rawResults = await this.read(queryString);
        console.log(rawResults);
        let formattedResult = rawResults.map((result) => {
            let accessFormat = new index_1.QAFormatData();
            accessFormat.parseData(result);
            return accessFormat;
        });
        console.log(formattedResult);
        return formattedResult;
    };
}
exports.QADatabaseManipulator = QADatabaseManipulator;
