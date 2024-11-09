export interface TaskInfo {
    taskID: string,
    taskName: string,
    content: string,
}

export interface TaskState {
    active?: TaskInfo[];
    pending?: TaskInfo[];
    inactive?: TaskInfo[];
}
