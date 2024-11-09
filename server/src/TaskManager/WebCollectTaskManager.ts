import { ITaskManager } from './ITaskManager'
import { IObservable } from '@Interfaces/IObservable'
import { IObserver } from '@Interfaces/IObserver'
import { Scheduler, ISchedulableTask } from './Scheduler'
import { ITask, TaskStatus, BaseTask, WebCollectTask } from '@Typing/Task/index'
import { MessageBroker, CreateTaskPublisherType } from 'MessageBroker/MessageBroker'
// Store all task
type WebCollectTaskPool<T> = Map<string, T>;

// For priority of tasks
class WebCollectTaskList<Type extends ITask> {

    private queueByTaskType: Map<number, Array<Type>> = new Map();

    private listSize: number = 10;

    constructor() {
        this.queueByTaskType.set(TaskStatus.Inactive, new Array<Type>());
        this.queueByTaskType.set(TaskStatus.Pending, new Array<Type>());
        this.queueByTaskType.set(TaskStatus.Active, new Array<Type>());
    }

    get ListSize(): number {
        return this.listSize;
    }

    set ListSize(value: number) {
        this.listSize = value;
    }

    get Inactive(): Array<Type> {
        return this.queueByTaskType.get(TaskStatus.Inactive)!;
    }

    get Pending(): Array<Type> {
        return this.queueByTaskType.get(TaskStatus.Pending)!;
    }

    get Active(): Array<Type> {
        return this.queueByTaskType.get(TaskStatus.Active)!;
    }

    public taskTypeExists = (taskType: TaskStatus): Boolean => {
        return this.queueByTaskType.has(taskType);
    }

    public queueAvailable = (taskType: TaskStatus): Boolean => {
        if (!this.taskTypeExists(taskType))
            throw "Task type not defined.";
        if (this.queueByTaskType.get(taskType)!.length < this.listSize)
            return true;
        else
            return false;
    }

    public insertToQueue = (taskType: TaskStatus, task: Type | undefined): boolean => {
        if (task == undefined || !this.taskTypeExists(taskType))
            throw "Task type not defined or task undefined.";
        let queue = this.queueByTaskType.get(taskType)!;
        if (queue.length < this.listSize) {
            queue.push(task);
            return true;
        }
        return false;
    }

    public popFromQueue = (taskType: TaskStatus): Type | null => {
        let task: Type;
        if (!this.taskTypeExists(taskType))
            throw "Task type not defined.";
        let queue = this.queueByTaskType.get(taskType)!;
        if (queue.length > 0) {
            task = queue[0];
            queue.shift();
            return task;
        }
        return null;
    }

    public removeTaskFromQueue = (queueType: TaskStatus, taskID: string): void => {
        this.queueByTaskType.set(queueType, this.queueByTaskType.get(queueType)!.filter((task: Type) => { return task.taskID != taskID }));
    }
};

export class WebCollectTaskManager implements ITaskManager {
    observerList: Array<IObserver<any>> = []
    tasks: WebCollectTaskList<ITask> = new WebCollectTaskList();
    taskPool: WebCollectTaskPool<WebCollectTask> = new Map<string, WebCollectTask>();
    publishTask: CreateTaskPublisherType =
        async (queue: string, task: BaseTask) => {
            console.log("Task publisher not initialized.");
        };
    scheduler: Scheduler = new Scheduler();

    constructor() {
        // Just to test

        let newTask: WebCollectTask = {
            taskID: "001",
            taskName: "a test task.",
            taskUrl: 'https://stackoverflow.com/questions',
            taskStatus: TaskStatus.Pending,
        };
        this.tasks.insertToQueue(
            TaskStatus.Pending,
            newTask
        );
        console.log("log pending:", this.tasks.Pending);
        newTask = {
            taskID: "002",
            taskName: "a test task.",
            taskUrl: 'https://stackoverflow.com/questions',
            taskStatus: TaskStatus.Pending,
        }
        this.tasks.insertToQueue(
            TaskStatus.Pending,
            newTask
        );
        newTask = {
            taskID: "003",
            taskName: "a test task.",
            taskUrl: "https://stackoverflow.com/questions",
            taskStatus: TaskStatus.Pending,
        }
        this.tasks.insertToQueue(
            TaskStatus.Pending,
            newTask
        );

        newTask = {
            taskID: "004",
            taskName: "a test task.",
            taskUrl: "https://stackoverflow.com/questions",
            taskStatus: TaskStatus.Pending,
        }
        this.tasks.insertToQueue(
            TaskStatus.Pending,
            newTask
        );
        newTask = {
            taskID: "005",
            taskName: "a test task.",
            taskUrl: "a test url.",
            taskStatus: TaskStatus.Inactive,
        }
        this.tasks.insertToQueue(
            TaskStatus.Inactive,
            newTask
        );
        newTask = {
            taskID: "006",
            taskName: "a test task.",
            taskUrl: "a test url.",
            taskStatus: TaskStatus.Inactive,
        }
        this.tasks.insertToQueue(
            TaskStatus.Inactive,
            newTask
        );

        setInterval(this.checkForQueueStatusChanged, 1000);
    }


    private checkForQueueStatusChanged = () => {
        try {
            if (!this.tasks.queueAvailable(TaskStatus.Active)) return;
            let taskToBeActivate: WebCollectTask | null = this.tasks.popFromQueue(TaskStatus.Pending) as WebCollectTask;
            if (taskToBeActivate == null) return;
            console.log("taskToBeActivate:", taskToBeActivate)
            if (!this.tasks.insertToQueue(TaskStatus.Active, taskToBeActivate)) {
                throw new Error('Parameter is not a number!');
            }
            if (taskToBeActivate == null) return;
            // TODO remove comment to actually start running tasks
            this.startTask(taskToBeActivate);
        }
        catch (error) {
            console.log(`Error while task queue status changed: ${error}`);
        }
    }

    public setTaskPublisher = (func: CreateTaskPublisherType) => {
        this.publishTask = func;
    }

    public addTask = (ID: string, name: string, content: string): boolean => {
        const newTask: WebCollectTask = {
            taskID: ID,
            taskName: name,
            taskUrl: content,
            taskStatus: TaskStatus.Pending
        } as WebCollectTask;

        /* TODO
         * when a new task arrive,
         * subscribe its trigger condition then let the task-condition-mechanism
         * decide whether the task is active or pending.
         * We might use Cron as the tool to schedule the tasks.
         */

        const r = this.tasks.insertToQueue(TaskStatus.Pending, newTask);


        /*
        this.scheduler.setInterval(
            newTask.taskID,
            () => {
                this.toPending(newTask)
            },
            10000
        );
        */
        return true;
    }

    public activateTask = (ID: string): boolean => {
        return true;
    }

    public getTasks(): Object {
        const TaskLists = {
            "active": this.tasks.Active,
            "pending": this.tasks.Pending,
            "inactive": this.tasks.Inactive,
        }
        return TaskLists;
    }

    public getTasksByName = (names: string): Array<ITask> => {
        var pendingTasks = this.tasks.Pending.filter((task: any) => {
            return names.includes(task.taskName);
        });
        var activeTasks = this.tasks.Active.filter((task: any) => {
            return names.includes(task.taskName);
        });
        return [...pendingTasks, ...activeTasks]
    }

    public subscribe = (observer: IObserver<any>): boolean => {
        this.observerList.push(observer);
        return true;
    }

    public toPending(task: WebCollectTask) {
        this.tasks.Inactive.filter((inactiveTask: ITask) => (inactiveTask.taskID != task.taskID));
        task.taskStatus = TaskStatus.Pending;
        this.tasks.insertToQueue(TaskStatus.Pending, task);
    }

    public markTaskCompleted = (task: ITask) => {

        let activeList = this.tasks.Active;
        // Ensure the task is in active queue
        activeList.forEach(
            (activeTask: ITask) => {
                console.log("activeTask:", activeTask.taskID);
                if (activeTask.taskID == task.taskID) {
                    console.log(`Mark as completed:${task.taskID}`)
                    this.tasks.removeTaskFromQueue(TaskStatus.Active, task.taskID);
                    this.tasks.insertToQueue(TaskStatus.Inactive, task);
                }
            }
        );
    }

    public startTask = (taskToBeActivate: WebCollectTask): void => {
        this.publishTask("crawl-web-data", taskToBeActivate);
    }

}