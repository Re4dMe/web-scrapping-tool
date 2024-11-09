const express = require('express');
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
export class ExpressApp {
    app: any;

    constructor(expressInstance: any) {
        this.app = expressInstance;
        this.app.use(cors({ origin: '*' }));
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        )

        this.app.use(express.static(path.resolve(__dirname, '../client/build')));
        this.app.use(express.json())
        this.app.use(bodyParser.json())

        this.app.get('/', (request: any, response: any) => {
            console.log(__dirname)
            var options = {
                root: path.join(__dirname)
            };
            //response.json({info: 'English'})
            response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        })

    }
}

