import { DBObjectBase } from "DBObjects/DBObjectBase";
import { IAccessFormat } from "./AccessFormat/IAccessFormat";
import { DataBaseManipulator, QAFormatData } from "@Database/index"

export class QADatabaseManipulator extends DataBaseManipulator {

    public buildInsertCommand = (table: string, data: IAccessFormat): string => {
        const extractedData = data.getStringFormatData();
        const columnNames: string[] = Array.from(extractedData.keys());
        const values: string[] = columnNames.map((key: string) => extractedData.get(key)!);

        let insertString: string;
        insertString = `INSERT INTO ${table} (${columnNames.join(',')}) VALUES (${values.join(',')})`;
        // console.log(`Insert command: ${insertString}`);
        return insertString;
    }

    public buildQueryCommand = (table: string, data: IAccessFormat): string => {
        try {
            const extractedData = data.getStringFormatData();
            const columnNames: string[] = Array.from(extractedData.keys());

            let insertString: string;
            insertString = `SELECT * FROM ${table}`;
            console.log(`Query command: ${insertString}`);
            return insertString;
        }
        catch (e) {
            console.log(e);
            return "";
        }
    }

    public createFormattedData = async (tableName: string, data: IAccessFormat): Promise<boolean> => {
        const insertString = this.buildInsertCommand(tableName, data);
        this.create(insertString);
        console.log("create data complete");
        return true;
    }

    public readFormattedData = async (tableName: string): Promise<IAccessFormat[]> => {
        let data: QAFormatData = new QAFormatData();
        const queryString = this.buildQueryCommand(tableName, data);
        // let accessFormat: QAFormatData = new QAFormatData();
        console.log(`query_string: ${queryString}`);
        let rawResults = await this.read(queryString);
        console.log(rawResults);
        let formattedResult: QAFormatData[] = rawResults.map((result: any) => {
            let accessFormat: QAFormatData = new QAFormatData();
            accessFormat.parseData(result);
            return accessFormat;
        });
        console.log(formattedResult);
        return formattedResult;
    }

}