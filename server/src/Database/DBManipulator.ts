import { IAccessFormat, QAFormatData } from "./AccessFormat";
import { IDBManipulator } from "./IDBManipulator";

export abstract class DataBaseManipulator implements IDBManipulator {

    pool: any;
    constructor(pool: any) {
        this.pool = pool;
    }

    public setBackendPool(pool: any): void {
        this.pool = pool
    }

    promisifiedQuery(query_string: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.pool.query(query_string, (error: any, results: any) => {
                if (error) {
                    console.log(error.toString());
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    public delete(): boolean {
        return true;
    }

    public read = async (queryCommand: string): Promise<any[]> => {
        let results: any = await this.promisifiedQuery(queryCommand);
        return results.rows;
    }

    public create = async (insertCommand: string): Promise<boolean> => {
        try {
            let query_string = insertCommand;
            console.log(`query_string when insert: ${query_string}`)
            let results = await this.promisifiedQuery(query_string)
            return true;
        }
        catch {
            return false;
        }
    }

    public abstract createFormattedData(tableName: string, data: IAccessFormat): Promise<boolean>;

    public abstract readFormattedData(tableName: string): Promise<IAccessFormat[]>;

    public abstract buildInsertCommand(table: string, data: IAccessFormat): string;
}