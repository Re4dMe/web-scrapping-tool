"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
class Scheduler {
    scheduleTasks = new Map();
    constructor() { }
    setInterval = (scheduleId, func, time) => {
        const timerId = setInterval(func, 1000);
        const scheduleTaskInfo = { timerId: timerId };
        this.scheduleTasks.set(scheduleId, scheduleTaskInfo);
        return true;
    };
    cancelSchedule = (scheduleId) => {
        const scheduleTask = this.scheduleTasks.get(scheduleId);
        if (scheduleTask != undefined)
            clearInterval(scheduleTask.timerId);
    };
}
exports.Scheduler = Scheduler;
