"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebCollectRunner = void 0;
const BaseTaskRunner_1 = require("./BaseTaskRunner");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
class WebCollectRunner extends BaseTaskRunner_1.BaseTaskRunner {
    startTaskConsumer = async (message) => {
        console.log("Task publisher not initialized.");
    };
    constructor() {
        super();
    }
    run = async (task) => {
        return await this.runWithRandomDelay(task);
    };
    runWithRandomDelay = async (task) => {
        this.isRunning = true;
        await new Promise(resolve => {
            setTimeout(resolve, Math.random() * 4000);
        });
        let result = await this.runTask(task);
        this.isRunning = false;
        return result;
    };
    runTask = async (task) => {
        console.log(`Running a new task. Name: ${task["taskName"]}`);
        // TODO: Write fail reason to task-log.
        if (!task.taskUrl.includes("http"))
            return new Promise(() => { });
        // To prevent be identified as a robot by website
        const config = {
            method: 'get',
            url: task.taskUrl, //'https://stackoverflow.com/questions' 
        };
        axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
        //let res = await axios(config); 
        //fs.writeFileSync("D://test.txt", res.data)
        const data = fs.readFileSync("D://test.txt", 'utf8');
        const $ = cheerio.load(data);
        let content;
        const retrivedQADataList = $('#questions .s-post-summary.js-post-summary .s-post-summary--content')
            .get()
            .map((element) => {
            const node = $(element).find('.s-link');
            return {
                "title": `'${node.text()}'`,
                "url": `'${node.attr('href')}'`,
            };
        });
        //console.log(res);
        this.isRunning = false;
        return new Promise((resolve, reject) => { resolve(retrivedQADataList); });
    };
}
exports.WebCollectRunner = WebCollectRunner;
