/*
 * This files creates DB Connection and perform all the DB Crud Operations.
 * */

//module which is used to conenct to the cassandra DB
const cassandra = require('cassandra-driver');
//Require the files to get the environment details
var nodeStarterConfig = require('../vcap_parser/environment_parser.js');
//Global variables
var client;

/**
 * Create DB Connection
 * @param {callBack} callback function contains error if connection failed.
 * */
function initDataBase(callBack) {

    // Get the DB Configuration from environment_parser.js and create connection to the database.
    var env = nodeStarterConfig.getEnv();
    client= new cassandra.Client(env);
    if(client) {
        //If no error has occurred, call the callback function with no error
        callBack(null);
    }
    else {
        //If any error has occurred, client object will not be created, hence send the error message to the callBack
        // function
        callBack("Error while connecting to database");
    }

}


/**
 * Execute the query and return the data in callBack
 * @param {query} query string to execute DB.
 * @param {params} optional params Array contains attribute values.
 * @param {callBack} function contains error  and data.
 * */
function executeQuery (query, params, callBack) {

    //If params are sent, it should be passed while excuting the query
    if(params) {
        client.execute(query, params,{ prepare: true },callBack);
    }
    else {
        client.execute(query,callBack);
    }
}


//Export all the functions to be used in other files.
exports.initDataBase = initDataBase;
exports.executeQuery = executeQuery;
exports.Uuid=cassandra.types.Uuid;
