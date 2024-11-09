import { TaskInfo, TaskState } from '../Typing/TaskType';

export const fetchTaskStatus = async (): Promise<TaskState> => {
    let url: string = "http://localhost:5000/WebCollectTaskManagementService/getTasks";
    return fetch(url)
        .then((res) => { 
            return res.json(); 
        })
        .then((data) => {
            return data
        })
        .catch((err) => console.log("Error while fetching: " + err));
}