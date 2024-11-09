export interface IBaseCollector {

    collect(target: string): Promise<any>;
    
}