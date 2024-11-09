const request = require('express')
import { TranslationDBObject } from '@Database/TranslationDBObject'
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'web_scraping_database',
    password: '123456',
    port: 5432
})

const db_table = "string_pair"
var tdbObject = new TranslationDBObject();
tdbObject.setBackendPool(pool)

export const getStringPair = async (request: any, response: any) => {
    try {
        const results = await tdbObject.getData(db_table);
        console.log(results);
        response.status(200).json({ data: results.rows });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export const createStringPair = async (request: any, response: any) => {
    try {
        const { var_string, chinese_string, english_string } = request.query
        const results = await tdbObject.createData(db_table, var_string, chinese_string, english_string)
        response.status(201).send(`User add with var_string ${var_string}`)
    }
    catch (err) {
        throw err
    }
}

export const deleteStringPair = (request: any, response: any) => {
    const { id } = request.query
    let query_string = `DELETE FROM ${db_table} WHERE ID = ${id} RETURNING *`
    console.log(query_string);
    pool.query(query_string, (error: any, results: any) => {
        if (error) {
            throw error
        }
        //console.log(results)
        response.status(201).send(`StringPair (ID = ${id}) has been deleted.`)
    })
}


module.exports = {
    getStringPair,
    createStringPair,
    deleteStringPair,
}