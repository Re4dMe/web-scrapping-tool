export class TranslationDBObject {
    pool: any;
    constructor(pool = null) {
        this.pool = pool;
    }

    public setBackendPool(pool: any): void {
        this.pool = pool
    }

    promisifiedQuery(query_string: string) {
        return new Promise((resolve, reject) => {
            this.pool.query(query_string, (error: any, results: any) => {
                if (error) {
                    console.log(error.toString())
                    reject(error)
                }
                resolve(results)
            });
        });
    }

    public async getData(table: string): Promise<any> {
        let query_all_string = `SELECT * FROM ${table}`;
        let results = await this.promisifiedQuery(query_all_string);
        console.log(results);
        return results;
    }

    async createData(table: string, a: string, b: string, c: string) {
        //TODO get format of data by table
        let query_string = `INSERT INTO ${table} (var_string, chinese_string, english_string) VALUES (${a}, ${b}, ${c}) RETURNING *`;
        let results = await this.promisifiedQuery(query_string)
        return results;
    }

    public replace(): boolean {
        return true;
    }

    public delete(): boolean {
        return true;
    }

    public create(table: string, a: string, b: string, c: string): boolean {
        return true;
    }
}