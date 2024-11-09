export interface ITaskRunner {
    busy(): boolean;
    run<T>(task: any): Promise<T>;
}