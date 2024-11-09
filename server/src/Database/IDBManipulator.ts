import { IAccessFormat } from "./AccessFormat/IAccessFormat";

export interface IDBManipulator {

    setBackendPool(pool: any): void;

    create(insertCommand: string): Promise<boolean>;

    createFormattedData(table: string, data: IAccessFormat): Promise<boolean>;

    read(queryCommand: string, accessFormat: IAccessFormat): Promise<any[]>

    readFormattedData(table: string): Promise<IAccessFormat[]>;

    delete(): boolean;

    promisifiedQuery(query_string: string): Promise<object>;

}

