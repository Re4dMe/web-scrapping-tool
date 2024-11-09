"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCollectTask = exports.BaseTask = void 0;
class BaseTask {
    taskID = "";
    taskName = "";
    constructor(taskID, taskName) {
        this.taskID = taskID;
        this.taskName = taskName;
    }
}
exports.BaseTask = BaseTask;
class WebCollectTask extends BaseTask {
    taskUrl = "";
    taskStatus;
}
exports.WebCollectTask = WebCollectTask;
;
