import { IBaseCollector } from './IBaseCollector'
const axios = require('axios')
const cheerio = require('cheerio')

export class PageCollecter implements IBaseCollector {

    constructor() {
    }

    public async collect (target: string): Promise<any> {
        const webPage = await axios.get(target);
        const $ = cheerio.load(webPage.data);
        return $;
    }
    
}