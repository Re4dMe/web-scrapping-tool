"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseManipulator = void 0;
class DataBaseManipulator {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    setBackendPool(pool) {
        this.pool = pool;
    }
    promisifiedQuery(query_string) {
        return new Promise((resolve, reject) => {
            this.pool.query(query_string, (error, results) => {
                if (error) {
                    console.log(error.toString());
                    reject(error);
                }
                resolve(results);
            });
        });
    }
    delete() {
        return true;
    }
    read = async (queryCommand) => {
        let results = await this.promisifiedQuery(queryCommand);
        return results.rows;
    };
    create = async (insertCommand) => {
        try {
            let query_string = insertCommand;
            console.log(`query_string when insert: ${query_string}`);
            let results = await this.promisifiedQuery(query_string);
            return true;
        }
        catch {
            return false;
        }
    };
}
exports.DataBaseManipulator = DataBaseManipulator;
