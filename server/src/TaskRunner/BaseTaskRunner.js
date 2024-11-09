"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTaskRunner = void 0;
class BaseTaskRunner {
    _isRunning = false;
    task = null;
    taskCompleteCallback = (taskID) => { };
    get TaskCompleteCallback() {
        return this.taskCompleteCallback;
    }
    set TaskCompleteCallback(callback) {
        this.taskCompleteCallback = callback;
    }
    get isRunning() {
        return this._isRunning;
    }
    set isRunning(value) {
        this._isRunning = value;
    }
    constructor() {
        // Intended to be blank
    }
    busy = () => {
        return this.isRunning;
    };
}
exports.BaseTaskRunner = BaseTaskRunner;
