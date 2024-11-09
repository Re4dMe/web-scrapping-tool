"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageCollecter = void 0;
const axios = require('axios');
const cheerio = require('cheerio');
class PageCollecter {
    constructor() {
    }
    async collect(target) {
        const webPage = await axios.get(target);
        const $ = cheerio.load(webPage.data);
        return $;
    }
}
exports.PageCollecter = PageCollecter;
