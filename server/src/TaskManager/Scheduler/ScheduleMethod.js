"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PeriodSchedule {
    constructor() { }
    setPeriod = (func, time) => {
        setInterval(func, 1000);
        return true;
    };
}
