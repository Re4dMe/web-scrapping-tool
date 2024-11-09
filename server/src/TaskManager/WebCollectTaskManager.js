"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCollectTaskManager = void 0;
const Scheduler_1 = require("./Scheduler");
const index_1 = require("@Typing/Task/index");
// For priority of tasks
class WebCollectTaskList {
    queueByTaskType = new Map();
    listSize = 10;
    constructor() {
        this.queueByTaskType.set(index_1.TaskStatus.Inactive, new Array());
        this.queueByTaskType.set(index_1.TaskStatus.Pending, new Array());
        this.queueByTaskType.set(index_1.TaskStatus.Active, new Array());
    }
    get ListSize() {
        return this.listSize;
    }
    set ListSize(value) {
        this.listSize = value;
    }
    get Inactive() {
        return this.queueByTaskType.get(index_1.TaskStatus.Inactive);
    }
    get Pending() {
        return this.queueByTaskType.get(index_1.TaskStatus.Pending);
    }
    get Active() {
        return this.queueByTaskType.get(index_1.TaskStatus.Active);
    }
    taskTypeExists = (taskType) => {
        return this.queueByTaskType.has(taskType);
    };
    queueAvailable = (taskType) => {
        if (!this.taskTypeExists(taskType))
            throw "Task type not defined.";
        if (this.queueByTaskType.get(taskType).length < this.listSize)
            return true;
        else
            return false;
    };
    insertToQueue = (taskType, task) => {
        if (task == undefined || !this.taskTypeExists(taskType))
            throw "Task type not defined or task undefined.";
        let queue = this.queueByTaskType.get(taskType);
        if (queue.length < this.listSize) {
            queue.push(task);
            return true;
        }
        return false;
    };
    popFromQueue = (taskType) => {
        let task;
        if (!this.taskTypeExists(taskType))
            throw "Task type not defined.";
        let queue = this.queueByTaskType.get(taskType);
        if (queue.length > 0) {
            task = queue[0];
            queue.shift();
            return task;
        }
        return null;
    };
    removeTaskFromQueue = (queueType, taskID) => {
        this.queueByTaskType.set(queueType, this.queueByTaskType.get(queueType).filter((task) => { return task.taskID != taskID; }));
    };
}
;
class WebCollectTaskManager {
    observerList = [];
    tasks = new WebCollectTaskList();
    taskPool = new Map();
    publishTask = async (queue, task) => {
        console.log("Task publisher not initialized.");
    };
    scheduler = new Scheduler_1.Scheduler();
    constructor() {
        // Just to test
        let newTask = {
            taskID: "001",
            taskName: "a test task.",
            taskUrl: 'https://stackoverflow.com/questions',
            taskStatus: index_1.TaskStatus.Pending,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Pending, newTask);
        console.log("log pending:", this.tasks.Pending);
        newTask = {
            taskID: "002",
            taskName: "a test task.",
            taskUrl: 'https://stackoverflow.com/questions',
            taskStatus: index_1.TaskStatus.Pending,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Pending, newTask);
        newTask = {
            taskID: "003",
            taskName: "a test task.",
            taskUrl: "https://stackoverflow.com/questions",
            taskStatus: index_1.TaskStatus.Pending,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Pending, newTask);
        newTask = {
            taskID: "004",
            taskName: "a test task.",
            taskUrl: "https://stackoverflow.com/questions",
            taskStatus: index_1.TaskStatus.Pending,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Pending, newTask);
        newTask = {
            taskID: "005",
            taskName: "a test task.",
            taskUrl: "a test url.",
            taskStatus: index_1.TaskStatus.Inactive,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Inactive, newTask);
        newTask = {
            taskID: "006",
            taskName: "a test task.",
            taskUrl: "a test url.",
            taskStatus: index_1.TaskStatus.Inactive,
        };
        this.tasks.insertToQueue(index_1.TaskStatus.Inactive, newTask);
        setInterval(this.checkForQueueStatusChanged, 1000);
    }
    checkForQueueStatusChanged = () => {
        try {
            if (!this.tasks.queueAvailable(index_1.TaskStatus.Active))
                return;
            let taskToBeActivate = this.tasks.popFromQueue(index_1.TaskStatus.Pending);
            if (taskToBeActivate == null)
                return;
            console.log("taskToBeActivate:", taskToBeActivate);
            if (!this.tasks.insertToQueue(index_1.TaskStatus.Active, taskToBeActivate)) {
                throw new Error('Parameter is not a number!');
            }
            if (taskToBeActivate == null)
                return;
            // TODO remove comment to actually start running tasks
            this.startTask(taskToBeActivate);
        }
        catch (error) {
            console.log(`Error while task queue status changed: ${error}`);
        }
    };
    setTaskPublisher = (func) => {
        this.publishTask = func;
    };
    addTask = (ID, name, content) => {
        const newTask = {
            taskID: ID,
            taskName: name,
            taskUrl: content,
            taskStatus: index_1.TaskStatus.Pending
        };
        /* TODO
         * when a new task arrive,
         * subscribe its trigger condition then let the task-condition-mechanism
         * decide whether the task is active or pending.
         * We might use Cron as the tool to schedule the tasks.
         */
        const r = this.tasks.insertToQueue(index_1.TaskStatus.Pending, newTask);
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
    };
    activateTask = (ID) => {
        return true;
    };
    getTasks() {
        const TaskLists = {
            "active": this.tasks.Active,
            "pending": this.tasks.Pending,
            "inactive": this.tasks.Inactive,
        };
        return TaskLists;
    }
    getTasksByName = (names) => {
        var pendingTasks = this.tasks.Pending.filter((task) => {
            return names.includes(task.taskName);
        });
        var activeTasks = this.tasks.Active.filter((task) => {
            return names.includes(task.taskName);
        });
        return [...pendingTasks, ...activeTasks];
    };
    subscribe = (observer) => {
        this.observerList.push(observer);
        return true;
    };
    toPending(task) {
        this.tasks.Inactive.filter((inactiveTask) => (inactiveTask.taskID != task.taskID));
        task.taskStatus = index_1.TaskStatus.Pending;
        this.tasks.insertToQueue(index_1.TaskStatus.Pending, task);
    }
    markTaskCompleted = (task) => {
        let activeList = this.tasks.Active;
        // Ensure the task is in active queue
        activeList.forEach((activeTask) => {
            console.log("activeTask:", activeTask.taskID);
            if (activeTask.taskID == task.taskID) {
                console.log(`Mark as completed:${task.taskID}`);
                this.tasks.removeTaskFromQueue(index_1.TaskStatus.Active, task.taskID);
                this.tasks.insertToQueue(index_1.TaskStatus.Inactive, task);
            }
        });
    };
    startTask = (taskToBeActivate) => {
        this.publishTask("crawl-web-data", taskToBeActivate);
    };
}
exports.WebCollectTaskManager = WebCollectTaskManager;
