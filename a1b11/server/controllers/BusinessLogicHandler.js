"use strict";

//Module dependencies.
/*globals logger*/
var DBHandler = require('./DBHandler');
var Model = require('../models/model');

/**
 * connect to mongo db
 * @param callBack - callback function to proceed to the route’s handler
 */

DBHandler.initDb(function()
{
    logger.log("info","Succesfully connected to DB ...");
});


/**
 * Create a new record
 * @param request
 * @param response
 * The Data to be inserted is passed in the request body
 */
function create(request,response){
    //construct a objectEntitymodel variable from the post request obtained
    var objectEntity = new Model(request.body);
    //Call the DBHandler function to insert the data
    DBHandler.save(objectEntity,function(error,data)
    {
        //Handle the data and the error object if present.
    });
}


//Export all functions in order to call from the route.js
exports.create = create;