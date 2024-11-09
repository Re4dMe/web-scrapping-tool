import { IPeriodSchedulingMethod } from './index'
import { Time } from '@Typing/index'
import { ISchedulableTask } from './SchedulableTask'

type ScheduleTaskInfo = {
    timerId: NodeJS.Timer,
}

export class Scheduler {
    scheduleTasks: Map<string, ScheduleTaskInfo> = new Map<string, ScheduleTaskInfo>()

    constructor() {}

    public setInterval = (scheduleId: string, func: any, time: Time): boolean => {
        const timerId = setInterval(func, 1000);
        const scheduleTaskInfo: ScheduleTaskInfo = {timerId: timerId} as ScheduleTaskInfo;
        this.scheduleTasks.set(scheduleId, scheduleTaskInfo);
        return true;
    }

    public cancelSchedule = (scheduleId: string) => {
        const scheduleTask = this.scheduleTasks.get(scheduleId);
        if (scheduleTask != undefined)
            clearInterval(scheduleTask.timerId);
    }
}   
