"use strict";
/*globals logger*/
var ToDoDbHandler = require('./DBHandler');
var TODO_COLLECTION = "todo";
/**
 * Create DB Connection and create table ToDo
 * @param {cb} callback function contains err if connection failed.
 * open one time db connection for all http requests
 */
ToDoDbHandler.initDataBase(function (err, data) {
    if (err) {
        logger.log("error", "Error connecting to database " + err.stack);
        return;
    }
    logger.log("info", "Connected to DB ... ");
    var createTableQuery = "CREATE TABLE IF NOT EXISTS " + TODO_COLLECTION +
        "(" +
        "task_name character varying(50)," +
        "_id serial NOT NULL PRIMARY KEY" +
        ")";
    ToDoDbHandler.executeQuery(createTableQuery, null, function (err, data) {
        if (err) {
            logger.log("error", "Error creating table " + err.stack);
            return;
        }
    });
});
/**
 * Response Handler
 * @param response - Object through which response is sent
 * @param status - Boolean status of the process
 * @param data - contains the error or data information to be returned
 * The response handler will send the data in json format according to the status.
 */
function responseHandler(response, status, data) {
    if (status) {
        return response.status(200).json({
            status: "Success",
            data: data
        });
    }
    else {
        return response.status(500).json({
            status: "Error",
            data: data
        });
    }
}
/**
 * Insert a new todo record
 * @param req
 * @param res
 * Data is an array which holds value to be passed in $
 */
function create(req, res) {
    if (req.body === undefined || req.body.task_name === undefined || req.body.task_name === "") {
        responseHandler(res, false, "Task name must not be empty");
    }
    else {
        // Retrieve the data to insert from the POST body
        var sql = "INSERT INTO " + TODO_COLLECTION + " (task_name) VALUES ($1) RETURNING *",
            data = [
                req.body.task_name
            ];
        ToDoDbHandler.executeQuery(sql, data, function (err, result) {
            if (err) {
                // internal errors
                responseHandler(res, false, "Failed to create todo list");
            }
            else {
                // The request created a new resource object
                // The result of CREATE should be the same as GET
                responseHandler(res, true, result.rows[0]);
            }
        });
    }
}
/**
 * to get all the todo list
 * @param req
 * @param res
 */
function all(req, res) {
    // SQL Query > Select Data
    var query = "SELECT * FROM " + TODO_COLLECTION;
    // Stream results back one row at a time
    ToDoDbHandler.executeQuery(query, null, function (err, result) {
        if (err) {
            // internal errors
            responseHandler(res, false, "Failed to get todo list");
        }
        else {
            // To do list of records
            responseHandler(res, true, result.rows);
        }
    });
}
/**
 * Update task name
 * @param req
 * @param res
 * @returns {*}
 */
function update(req, res) {
    if (req.body === undefined || req.body.task_name === undefined || req.body.task_name === "") {
        responseHandler(res, false, "Task name must not be empty");
    }
    else {
        // We access the ID param on the request object
        var id = req.params._id,
        // Grab data from http request
            data = [req.body.task_name, id],

        // SQL Query > Update Data
            sql = "UPDATE " + TODO_COLLECTION + " SET task_name=($1) WHERE _id=($2) RETURNING *";

        ToDoDbHandler.executeQuery(sql, data, function (err, result) {
            if (err) {
                // internal errors
                responseHandler(res, false, 'Failed to update todo list');
            }
            else if (result.rowCount === 0) {
                responseHandler(res, false, 'Task ID is not valid');
            }
            else {
                responseHandler(res, true, result.rows[0]);
            }
        });
    }
}
/**
 * delete todo record based on _id
 * @param req
 * @param res
 */
function remove(req, res) {
    // We access the ID param on the request object
    var id = req.params._id;
    var query = "DELETE FROM " + TODO_COLLECTION + " WHERE _id=($1)";
    // SQL Query > Delete Data
    ToDoDbHandler.executeQuery(query, [id], function (err, result) {
        if (err) {
            // internal errors
            responseHandler(res, false, "Failed to delete todo list");
        }
        else if (result.rowCount === 0) {
            responseHandler(res, false, "Task ID is not valid");
        }
        else {
            responseHandler(res, true, "Deleted Successfully");
        }
    });
}

exports.create = create;
exports.update = update;
exports.all = all;
exports.remove = remove;
