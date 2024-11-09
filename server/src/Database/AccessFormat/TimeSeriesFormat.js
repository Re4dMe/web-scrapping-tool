"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesFormat = void 0;
const BaseFormat_1 = require("./BaseFormat");
class TimeSeriesFormat extends BaseFormat_1.BaseFormat {
    start_date = "";
    end_date = "";
    retreiveFormatData = () => {
        const dataMap = {
            "start_day": this.start_date,
            "end_day": this.end_date,
        };
        return dataMap;
    };
}
exports.TimeSeriesFormat = TimeSeriesFormat;
