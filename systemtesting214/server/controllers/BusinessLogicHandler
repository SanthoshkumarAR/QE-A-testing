"use strict";
/*globals logger*/
var DBHandler = require('./DBHandler');
var TABLE_NAME = "TableName";
/**
 * Create DB Connection and create table
 * @param callback function contains error if connection failed.
 * open one time db connection for all http requests
 */
DBHandler.initDataBase(function (error) {
    if (error) {
        logger.log("error", "Error connecting to database " + error);
        return;
    }
    else {
        logger.log("info", "Connected to DB ... ");
        /*The following is the query which denotes the schema of the tabke to be created. It is a good practise to
         create a primary key for for searches and indexing.*/
        var createTableQuery = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME +
            "(" +
            "columnName character varying(200)," +
            "_id serial NOT NULL PRIMARY KEY" +
            ")";
        DBHandler.executeQuery(createTableQuery, null, function (error) {
            if (error) {
                logger.log("error", "Error creating table " + error.stack);
                return;
            }
        });
    }
});

/**
 * Insert a new record
 * @param request
 * @param response
 * Data is an array which holds value to be passed in $
 */
function create(request, response) {
    // Retrieve the data to insert from the POST body
    var query = "INSERT INTO " + TABLE_NAME + " (columnName) VALUES ($1) RETURNING *";
    var data = [
        request.body.columnName
    ];
    DBHandler.executeQuery(query, data, function (error, result) {
        if (error) {
            // Handle internal errors
        }
        else {
            // The request created a new resource object
        }
    });

}

/**
 * Export all functions to be accessed in other files
 */
exports.create = create;

