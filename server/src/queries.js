"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStringPair = exports.createStringPair = exports.getStringPair = void 0;
const request = require('express');
const TranslationDBObject_1 = require("@Database/TranslationDBObject");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'euv_translation',
    password: '123456',
    port: 5432
});
const db_table = "string_pair";
var tdbObject = new TranslationDBObject_1.TranslationDBObject();
tdbObject.setBackendPool(pool);
const getStringPair = async (request, response) => {
    try {
        const results = await tdbObject.getData(db_table);
        console.log(results);
        response.status(200).json({ data: results.rows });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.getStringPair = getStringPair;
const createStringPair = async (request, response) => {
    try {
        const { var_string, chinese_string, english_string } = request.query;
        const results = await tdbObject.createData(db_table, var_string, chinese_string, english_string);
        response.status(201).send(`User add with var_string ${var_string}`);
    }
    catch (err) {
        throw err;
    }
};
exports.createStringPair = createStringPair;
const deleteStringPair = (request, response) => {
    const { id } = request.query;
    let query_string = `DELETE FROM ${db_table} WHERE ID = ${id} RETURNING *`;
    console.log(query_string);
    pool.query(query_string, (error, results) => {
        if (error) {
            throw error;
        }
        //console.log(results)
        response.status(201).send(`StringPair (ID = ${id}) has been deleted.`);
    });
};
exports.deleteStringPair = deleteStringPair;
module.exports = {
    getStringPair: exports.getStringPair,
    createStringPair: exports.createStringPair,
    deleteStringPair: exports.deleteStringPair,
};
