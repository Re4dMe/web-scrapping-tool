import { DBObjectBase } from "./DBObjectBase";
export class PObject implements DBObjectBase {
    requestor: any
    constructor() {
        this.requestor = null;
    }

    public setBackendPool(requestor: any): void {

    }

    public get(tableName: string): any {
        /*
        let query_string = `SELECT * FROM ${tableName}`
        this.requestor
            .query(query_string)
            .then((error: any, result: any) => {
                console.log(result.rows)
            })
        */
    }

    public create(): any {}
    
    public replace(): any {}

    public delete(): any {}

}