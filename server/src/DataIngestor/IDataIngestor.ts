interface WebRetrieveDataStructure {
    url: string,
    name: string,
    date: string,
    high: string,
}

export interface IDataIngestor {
    getParseData(): WebRetrieveDataStructure,
}