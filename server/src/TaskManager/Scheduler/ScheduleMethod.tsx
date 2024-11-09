import { IPeriodSchedulingMethod } from './index'
import { Time } from '../../Typing/index'
class PeriodSchedule {

    constructor() {}

    public setPeriod = (func: any, time: Time) => {
        setInterval(func, 1000);
        return true;
    }

}
