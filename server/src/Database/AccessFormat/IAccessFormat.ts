export interface IAccessFormat {
    // parse raw data
    parseData(data: any): boolean;
    getStringFormatData(): Map<string, string>;
}