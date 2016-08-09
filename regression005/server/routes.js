"use strict";
//Require the appropriate modules and file needed
var express = require('express');
var ToDoHandler = require('./controllers/ToDoHandler');
// Create the express router object for ToDo
var ToDoRouter = express.Router();
/*
*Create a single todo when post request is received. Call the ToDoHandler function to do the action.
 */
ToDoRouter.post('/', ToDoHandler.create);
/*
*Get all todos when GET action is received. Call the ToDoHandler function to do the action
 */
ToDoRouter.get('/', ToDoHandler.all);
/**
 * Update a single todo when PUT action is received. Call the ToDoHandler function to do the action
 */
ToDoRouter.put('/:_id', ToDoHandler.update);
/**
 * Delete a single todo when DELETE action is received. Call the ToDoHandler function to do the action
 */
ToDoRouter.delete('/:_id', ToDoHandler.remove);
module.exports = ToDoRouter;
