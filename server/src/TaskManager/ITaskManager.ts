
export interface ITaskManager {
    addTask(ID: string, name: string, content: string): boolean;
    getTasks(): Object;
    getTasksByName(names: string): Array<Object>
}