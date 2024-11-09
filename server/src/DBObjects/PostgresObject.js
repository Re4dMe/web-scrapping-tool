"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PObject = void 0;
class PObject {
    requestor;
    constructor() {
        this.requestor = null;
    }
    setBackendPool(requestor) {
    }
    get(tableName) {
        /*
        let query_string = `SELECT * FROM ${tableName}`
        this.requestor
            .query(query_string)
            .then((error: any, result: any) => {
                console.log(result.rows)
            })
        */
    }
    create() { }
    replace() { }
    delete() { }
}
exports.PObject = PObject;
