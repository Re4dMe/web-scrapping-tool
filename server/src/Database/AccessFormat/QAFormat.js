"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAFormatData = void 0;
/* TODO
*  Refactor the code to avoid side effect of parseData.
*  Maybe seperate the "Data" (dataMap) and process flow (parseData) to 2 classes.
*/
class QAFormatData {
    dataMap = new Map([
        ["title", ""],
        ["url", ""],
    ]);
    parseData(data) {
        try {
            for (const key in data) {
                if (this.dataMap.has(key))
                    this.dataMap.set(key, data[key]);
            }
            return true;
        }
        catch {
            return false;
        }
    }
    getFormatData = () => {
        return this.dataMap;
    };
    getStringFormatData = () => {
        return this.dataMap;
    };
}
exports.QAFormatData = QAFormatData;
