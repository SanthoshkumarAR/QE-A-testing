/*
 * This files Handles all the business logic for a To Do application.
 * */


//Require the dependant files
var ToDoDBHandler = require('./DBHandler');

// Constants Messages
var TASK_MESSAGE = 'Task name must not be empty';
var DELETE_MESSAGE = 'Deleted Successfully';
var TASK_ID_MESSAGE = 'Task ID is not valid';


/**
 * Create DB Connection
 * @param {callBack} callback function contains error if connection failed.
 * */
ToDoDBHandler.initDataBase(function (error) {
    if (!error) {
        logger.log('info', 'Connected to DB ...');
        //During the initial setup the table is created if it does not exists
        var createTableQuery  =  'CREATE TABLE ToDo (id uuid PRIMARY KEY,task_name text)';
        ToDoDBHandler.executeQuery (createTableQuery, null, function (error, data) {
            if(!error)
                logger.log('info', 'Table created');
        });

    }
});



/**
 *  Create a ToDo task
 * @param {request} request from server which contains task_name
 * @param {response} response instance to send the response
 */
function create (request, response) {
    //Check if the task_name is sent in the request
    if(request.body.task_name) {
        //Generate a unique ID to identify each task.Creates a new random (version 4) Uuid
        var id=ToDoDBHandler.Uuid.random();
        //Query to insert a task into the table
        var insertQuery = 'INSERT INTO ToDo(id,task_name) VALUES (?,?)';

        ToDoDBHandler.executeQuery(insertQuery, [id,request.body.task_name], function(error, data){

            if(!error) {
                //Send the inserted document as part of the response
                returnDocument(id, response);
            }
            else {
                //Send the error as part of the response
                responseHandler(response, false, error);
            }

        });
    }
    //If task_name is not present send error since it is a mandatory field
    else {
        responseHandler(response, false, TASK_MESSAGE);
    }

}

/**
 *  Update ToDo task
 * @param {request} request from server which contains task_name and _id
 * @param {response} response instance to send the response
 */
function update (request, response) {
    //Check if the request contains the task_name which is a mandatory field
    if(request.body.task_name) {
        //Check if there is a record in the table with the given id
        getRecord(request.params._id, function(error, data) {
            //If record is present, continue to update the record
            if (data) {
                //Query to update a row in the table using the id as the primary key
                var updateQuery = 'UPDATE ToDo SET task_name = ? WHERE id = ?';
                ToDoDBHandler.executeQuery(updateQuery, [request.body.task_name, request.params._id],
                    function (error) {
                        //If no error has occurred, send the updated record as part of the response
                        if (!error) {
                            returnDocument(request.params._id, response);
                        }
                        else {
                            //Send the error as part of the response
                            responseHandler(response, false, error);
                        }

                    });
            }
            //If the record is not present, throw error message as response since a non existing record is tried to be
            // updated.
            else {
                responseHandler(response, false, TASK_ID_MESSAGE);
            }
        });
    }
    //If the task_name is not present, throw an error since it is a mandatory field
    else {
        responseHandler(response, false, TASK_MESSAGE);
    }
}

/**
 *  Get the List of ToDo's
 * @param {request} request from server
 * @param {response} response instance to send the response
 */
function all (request, response) {
    //Query to get the list of tasks from the table
    var getAllQuery = 'SELECT * FROM ToDo';

    ToDoDBHandler.executeQuery(getAllQuery, null, function(error, data){
        if(!error) {
            //If no error has occurred, senf the list of rows as part of the response
            responseHandler(response, true, data.rows);
        }
        else {
            //If any error has occurred throw the error as part of the response
            responseHandler(response, false, error);
        }
    });
}

/**
 *  Delete a ToDo
 * @param {request} request from server containing the primary key _id
 * @param {response} response instance to send the response
 */
function remove (request, response) {
    //Query to delete a record from the table
    var deleteQuery = 'DELETE FROM ToDo WHERE id = ?';

    //Check the database if there is a record with the given id
    getRecord(request.params._id, function(error, data) {
        //If there is a record present, proceed to deleting the record
        if (data) {
            ToDoDBHandler.executeQuery(deleteQuery, [request.params._id], function(error, data){
                if(!error) {
                    //If no error has occurred send back a success message as the response
                    responseHandler(response, true, DELETE_MESSAGE);
                }
                else {
                    //If any error has occurred throw the error as part of the response
                    responseHandler(response, false, error);
                }
            });
        }
        //If the record is not present, throw error message as response since a non existing record is tried to be
        // deleted.
        else {
            responseHandler(response, false, TASK_ID_MESSAGE);
        }
    });


}


/**
 * Find and return the record as response
 * @param {id} id of the record to be found
 * @param {response} response instance to send the response
 */
function returnDocument (id, response) {

    //Get the record from the database using the given id
    getRecord(id, function(error, data) {
        //If there is no error, return the record as part of the response
        if(!error) {
            responseHandler(response, true, data);
        }
        else {
            //If any error has occurred throw the error as part of the response
            responseHandler(response, false, error);
        }
    });

}


/**
 *  Find record from the database
 * @param {id} id of the record to be found
 * @param {callBack} call-back function to be called
 */
function getRecord (id,callBack) {

    //Query to find a single record based on the primary key "id"
    var getQuery = 'SELECT * FROM ToDo WHERE id = ?';
    ToDoDBHandler.executeQuery(getQuery, [id], function(error, data) {
        //If no error has occurred, call the callback function with the data obtained from database
        if(!error) {
            callBack(null,data.rows[0]);
        }
        //If any error has occurred send it to the callback function
        else {
            callBack(error,null);
        }
    });

}

/**
 * Response Handler
 * @param response - Object through which response is sent
 * @param status - Boolean status of the process
 * @param data - contains the error or data information to be returned
 * The response handler will send the data in json format according to the status.
 */
function responseHandler(response, status, data)
{

    if(status){
        return response.status(200).json({
            status: "Success",
            data: data
        });
    }
    else
    {
        logger.log("error","Error : "+data);
        return response.status(500).json({
            status: "Error",
            data: data
        });
    }
}

//Export all the required functions to be used in other files
exports.create = create;
exports.update = update;
exports.all = all;
exports.remove = remove;