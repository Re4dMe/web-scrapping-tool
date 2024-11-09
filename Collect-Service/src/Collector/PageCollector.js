const BaseCollector = require('./Base.js')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = class PageCollecter extends BaseCollector {
    constructor() { }

    collect = async (target) => {
        this.target = target;
        const webPage = await axios.get(target);
        const $ = cheerio.load(webPage.data);

    }
}