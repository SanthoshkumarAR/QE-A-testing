/*global logger*/

/*This class will post notification to the DBHandler whenever server receives the request */

'use strict';

//  Require the dependant files.
var ToDoDbHandler = require('./DBHandler');
var nodeStarterConfig = require('../vcap_parser/environment_parser.js');
var query = require('../config/QueryConstants');
var env = nodeStarterConfig.getEnv();
var seneca=ToDoDbHandler.seneca;

/*
 Intialise the store and connect to the Database using the DBHandler. Get the store and initial setup queries from the
 QueryConstants file. seneca.make function is used to create data entity objects to store using the storage plugin.
 */
ToDoDbHandler.initDB(query.STORE,env,seneca.make$('ToDo'),query.CREATE_TABLE_QUERY,function(error,status){
    //If no error has occurred while connecting to the Database
    if(!error) {
        logger.log("info","Succesfully connected to DB ...");
    }
});



/**
 * Response Handler
 * @param response - Object through which response is sent
 * @param status - Boolean status of the process
 * @param data - contains the error or data information to be returned
 * The response handler will send the data in json format according to the status.
 */
function responseHandler(response,status,data){

    var errorCode;
    var responseObject;
    if(status){
        logger.log("info","Response sent successfully :"+data);
        //status is set as 200 since the result is success
        errorCode=200;
        responseObject={
            status: "Success",
            data: data
        };

    }
    else
    {
        logger.log("error","Server error has occurred :"+data);
        //status is set as 500 since error has occurred. The error information is sent as response.
        errorCode=500;
        responseObject={
            status: "Error",
            data: data
        };

    }
    response.status(errorCode).json(responseObject);
}

/**
 * Create a new toDo record
 * @param request
 * @param response
 * The Data to be inserted is passed in the request body
 */
function create(request,response){
    //The seneca.make function is used to create seneca data entity objects which stores data in the table name "ToDo"
    var toDoEntity=seneca.make$('ToDo');
    //Assign the values obtained from the request to the entity
    toDoEntity.task_name=request.body.task_name;

    //Check if task_name is empty or not given
    if(toDoEntity.task_name === undefined || toDoEntity.task_name === "")
    {
        return responseHandler(response,false,"Task name must not be empty");
    }
    /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "saveObjectEvent" throwing
     the event that the pattern has matched. The associated function in DBHandler to insert the data, which has
      to be executed when this pattern occurs, will be executed.
     */
    seneca.act({cmd: 'saveObjectEvent',entity:toDoEntity }, function (error, data) {
        //If some error has occurred send error response
        if(error) {
            return responseHandler(response,false,error);
        }
        else {
            return responseHandler(response,true,data);
        }
    });

}

/**
 * Update a toDo record
 * @param request
 * @param response
 * The Data to be modified is passed in the request body and _id of object to be modified is passed as path param
 */
function update(request, response) {
    //The seneca.make function is used to create seneca data entity objects which stores data in the table name "ToDo"
    var toDoEntity=seneca.make$('ToDo');
    //Assign the id for which the values has to be updated.
    toDoEntity.id=request.params._id;
    //Assign the new value from the request body to the object obtained from database
    toDoEntity.task_name  = request.body.task_name;
    // Check if task_name is empty or not given
    if (toDoEntity.task_name === undefined || toDoEntity.task_name === "") {
        return responseHandler(response,false,"Task name must not be empty");

    }
    /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "findObjectEvent" throwing
     the event that the pattern has matched. The associated function in DBHandler, to find the existing to do from the
     database, which has to be executed when this pattern occurs, will be executed.
     */

    seneca.act({cmd: 'findObjectEvent',entity:toDoEntity}, function onFind(error, toDoObject) {
        //If any error has occurred, it means the task id is not present in the database
        if (error || !toDoObject) {
            return responseHandler(response,false,"Task ID is not valid");
        }
        else
        {
            /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "saveObjectEvent"
            throwing the event that the pattern has matched. The associated function in DBHandler, to save/update the to do
            object in the database, which has to be executed when this pattern occurs, will be executed.
             */
            seneca.act({cmd: 'saveObjectEvent',entity:toDoEntity}, function (error, toDoObject) {
                //If any error has occurred, it will be stored in error variable
                if (error) {
                    return responseHandler(response,false,error);
                }
                //If no error has occurred send the updated data as part of response
                else {
                    return responseHandler(response,true,toDoObject);
                }
            });
        }
    });


}

/**
 * Delete a to do record
 * @param request
 * @param response
 * The _id of object to be deleted is passed as path param
 */
function remove(request, response) {
    //The seneca.make function is used to create seneca data entity objects which stores data in the table name "ToDo"
    var toDoEntity = seneca.make$('ToDo');
    //Assign the id of the object to be deleted from the request to the entity
    toDoEntity.id = request.params._id;
    /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "findObjectEvent" throwing
     the event that the pattern has matched. The associated function in DBHandler, to find the existing to do from the
     database, which has to be executed when this pattern occurs, will be executed.
     */
    seneca.act({cmd: 'findObjectEvent', entity: toDoEntity}, function onFind(error, toDoObject) {
        //If any error has occurred, it means the task id is not present in the database
        if (error || !toDoObject) {
            return responseHandler(response, false, "Task ID is not valid");
        }
        else {
            /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "deleteObjectEvent"
            throwing the event that the pattern has matched. The associated function in DBHandler to delete the object
            from the database, which has to be executed when this pattern occurs, will be executed.
             */
            seneca.act({cmd: 'deleteObjectEvent', entity: toDoEntity}, function (error) {
                //If any error has occurred, it will be stored in error variable
                if (error) {
                    return responseHandler(response, false, error);
                }
                //If no error has occurred send the success message as response
                else {
                    return responseHandler(response, true, "Deleted Successfully");
                }
            });
        }


    });
}


/**
 * Get All to do records
 * @param request
 * @param response
 * All the records present in the database is returned
 */
function all(request, response) {
    logger.log("info","GET request received ");
    //The seneca.make function is used to create seneca data entity objects which stores data in the table name "ToDo"
    var toDoEntity=seneca.make$('ToDo');
    /*The seneca.act method accepts an object which is the "toDoEntity", and runs the command "getAllObjectsEvent"
     throwing the event that the pattern has matched. The associated function in DBHandler to retrieve all the todos
     from the database, which has to be executed when this pattern occurs, will be executed.
     */
    seneca.act({cmd : 'getAllObjectsEvent',entity:toDoEntity}, function (error, todos) {
        // if there is an error retrieving, send the error. nothing after response.send(error) will execute
        if (error) {
            return responseHandler(response,false,error);
        }
        // return all todos in the response
        else {
            return responseHandler(response,true,todos);
        }
    });

}


//Export all functions in order to call from the route.js
exports.create = create;
exports.all = all;
exports.update = update;
exports.remove = remove;