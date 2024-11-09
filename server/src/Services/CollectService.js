"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectPage = void 0;
const PageCollector_1 = require("@Collector/PageCollector");
const collectPage = (url) => {
    const pageCollector = new PageCollector_1.PageCollecter();
    pageCollector.collect(url)
        .then((r) => {
        console.log(r);
    });
};
exports.collectPage = collectPage;
