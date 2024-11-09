import { IObserver } from '@Interfaces/IObserver';
import { ITaskRunner } from './ITaskRunner'
import { WebCollectTask } from '@Typing/Task/index'
import { BaseTaskRunner } from './BaseTaskRunner';
import { BaseTask } from "@Typing/Task";
import { MessageBroker, CreateTaskConsumerType } from 'MessageBroker/MessageBroker'
const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs'); 

export class WebCollectRunner extends BaseTaskRunner {

    startTaskConsumer: CreateTaskConsumerType =
        async (message) => {
            console.log("Task publisher not initialized.");
        };

    public constructor() {
        super();
    }
    
    run = async <T>(task: WebCollectTask): Promise<any> => {
        return await this.runWithRandomDelay(task);
    }

    public runWithRandomDelay = async (task: WebCollectTask): Promise<any> => {
        this.isRunning = true;
        await new Promise(resolve => {
            setTimeout(resolve, Math.random() * 4000);
        });
        let result = await this.runTask(task);
        this.isRunning = false;
        return result;
    }

    public runTask = async (task: WebCollectTask): Promise<any> => {
        console.log(`Running a new task. Name: ${task["taskName"]}`);
        
        // TODO: Write fail reason to task-log.
        if (!task.taskUrl.includes("http")) return new Promise(()=>{});
        // To prevent be identified as a robot by website
        const config = { 
            method: 'get', 
            url: task.taskUrl, //'https://stackoverflow.com/questions' 
        };
        axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        //let res = await axios(config); 
        //fs.writeFileSync("D://test.txt", res.data)
        const data = fs.readFileSync("D://test.txt", 'utf8');
        const $ = cheerio.load(data);
        let content: string;
        const retrivedQADataList: any = $('#questions .s-post-summary.js-post-summary .s-post-summary--content')
            .get()
            .map((element: any) => {
                const node = $(element).find('.s-link');
                return {
                    "title": `'${node.text()}'`,
                    "url": `'${node.attr('href')}'`,
                }  
            });
        
        //console.log(res);
        this.isRunning = false;
 
        return new Promise((resolve, reject)=>{ resolve(retrivedQADataList); });
    }
}