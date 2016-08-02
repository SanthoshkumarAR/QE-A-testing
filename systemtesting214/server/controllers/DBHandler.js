"use strict";
/**
 * This file is for CRUD Operations using PostgreSQL - create,read,update and delete a particular record
 */
// Require necessary modules
var postgres = require("pg");
var nodeStarterConfig = require('../vcap_parser/environment_parser');
var postgresDb = "";
/**
 * connect to postgres db and pass database to the router via request
 */
function initDataBase(cb) {
    var dbEnv = nodeStarterConfig.getEnv();
    var conString = dbEnv.url;
    // Get a Postgres client from the connection pool
    postgres.connect(conString, function (err, db) {
        // Handle connection errors
        if (err) {
            // send the error in callback
            cb(err);
        }
        else {
            // all modules share an instance with the same db module
            postgresDb = db;
            cb(null, true);
        }
    });
}
/**
 * Execute the query and return the data in callBack
 * @param {query} query string to execute DB.
 * @param {params} params Array contains attribute values.
 * @param {callBack} function contains err  and data.
 * */
function executeQuery(query, params, callBack) {
    if (params) {
        postgresDb.query(query, params, function (err, data) {
            callBack(err, data);
        });
    }
    else {
        postgresDb.query(query, function (err, data) {
            callBack(err, data);
        });
    }
}
/**
 * Export all functions to be accessed in other files
 * @type {initDb}
 */
exports.initDataBase = initDataBase;
exports.executeQuery = executeQuery;

