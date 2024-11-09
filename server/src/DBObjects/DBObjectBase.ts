export interface DBObjectBase {
    setBackendPool(requestor: any): void

    get(tableName: string): any
    
    create(): any
    
    replace(): any

    delete(): any
}

