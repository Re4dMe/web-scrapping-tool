import { IAccessFormat } from "./IAccessFormat";


/* TODO
*  Refactor the code to avoid side effect of parseData.
*  Maybe seperate the "Data" (dataMap) and process flow (parseData) to 2 classes.
*/
export class QAFormatData implements IAccessFormat {
    private dataMap = new Map<string, any>([
        ["title", ""],
        ["url", ""],
    ]);

    parseData(data: any): boolean {
        try {
            for (const key in data) {
                if (this.dataMap.has(key)) 
                    this.dataMap.set(key, data[key]);
            }
            return true;
        }
        catch {
            return false
        }
    }

    getFormatData = (): Map<string, any> => {
        return this.dataMap;
    };

    getStringFormatData = (): Map<string, string> => {
        return this.dataMap;
    };
}