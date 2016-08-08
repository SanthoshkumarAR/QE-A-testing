/*
 * This files creates DB Connection and perform all the DB Crud Operations.
 * */

var mySQLObj = require("mysql2");

var nodeStarterConfig = require('../vcap_parser/environment_parser');

var objConnection;

/**
 * Create DB Connection
 * @param {callBack} callback function contains err if connection failed.
 * */
function initDataBase(callBack) {

    // Get the DB Configuration from environment_parser.js and create connection to the database.
    var env = nodeStarterConfig.getEnv();
    objConnection = mySQLObj.createConnection(env);

    objConnection.connect(function (err) {
        if (err) {
            if (callBack)
                callBack(err);
            return;
        }
        else {
        if (callBack)
            callBack(null);
        }
    });
    // Connection to the MySQL server is usually lost due to either server restart, or a connnection idle timeout (the wait_timeout server variable configures this)
    objConnection.on('error', function (err) {
        logger.log('info', 'db error ' + err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            initDataBase(null);
        } else {
            throw err;
        }
        if (callBack)
            callBack(null);
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
        objConnection.query(query, params, function (err, data) {
            callBack(err, data);

        });
    }
    else {
        objConnection.query(query, function (err, data) {
            callBack(err, data);

        });
    }
}
/**
 * Export all functions to be accessed in other files
 */
exports.initDataBase = initDataBase;
exports.executeQuery = executeQuery;