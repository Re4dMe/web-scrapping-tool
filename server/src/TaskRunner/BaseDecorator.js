"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDecorator = void 0;
class BaseDecorator {
    taskRunner;
    get isRunning() {
        return this.taskRunner.busy();
    }
    constructor(taskRunner) {
        this.taskRunner = taskRunner;
    }
    busy = () => {
        return this.taskRunner.busy();
    };
    run = async (task) => {
        return this.taskRunner.run(task);
    };
}
exports.BaseDecorator = BaseDecorator;
