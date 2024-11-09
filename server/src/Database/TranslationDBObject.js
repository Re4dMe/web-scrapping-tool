"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationDBObject = void 0;
class TranslationDBObject {
    pool;
    constructor(pool = null) {
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
    async getData(table) {
        let query_all_string = `SELECT * FROM ${table}`;
        let results = await this.promisifiedQuery(query_all_string);
        console.log(results);
        return results;
    }
    async createData(table, a, b, c) {
        //TODO get format of data by table
        let query_string = `INSERT INTO ${table} (var_string, chinese_string, english_string) VALUES (${a}, ${b}, ${c}) RETURNING *`;
        let results = await this.promisifiedQuery(query_string);
        return results;
    }
    replace() {
        return true;
    }
    delete() {
        return true;
    }
    create(table, a, b, c) {
        return true;
    }
}
exports.TranslationDBObject = TranslationDBObject;
