'use strict';

/**
 * This file contains the database CRUD operations
 */

//Module dependencies.
var ToDoModel = require('../models/toDoModel');

//This function retrieves all data from the to do database
function getAll(callBack) {
    ToDoModel.find(callBack);
}

//This function retrieves single data from the to do database
function findById(_id, callBack) {
    ToDoModel.findById(_id, callBack);
}

module.exports = function (ToDo) {

    return {

        /**
         * Create an ToDo
         */
        create: function (req, res) {
            //construct a todomodel variable from the post request obtained
            var todo = new ToDoModel(req.body);

            //insert the data into database
            todo.save(function (err) {
                //If any error has occurred, it will be stored in err variable
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the todo'
                    });
                }
                // get and return all the todos after you create another
                getAll(function (err, todos) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err) {
                        res.send(err);
                    }
                    // return all todos in JSON format
                    res.json(todos);
                });
            });
        },

        /**
         * Update an ToDo
         */
        update: function (req, res) {



            findById(req.params.todo_id, function (error, toDo) {

                //If any error has occurred, it means the task id is not present in the database
                if (error) {
                    return res.status(500).json({
                        error: 'Cannot update the todo'
                    });
                }

                //Assign the new value from the request body to the object obtained from database
                toDo.text = req.body.text;

                toDo.save(function (err) {
                    //If any error has occurred, it will be stored in err variable
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the todo'
                        });
                    }
                    // get and return all the todos after you create another
                    getAll(function (err, todos) {
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err) {
                            res.send(err);
                        }
                        // return all todos in JSON format
                        res.json(todos);
                    });
                });

            });

        },

        /**
         * Delete a ToDo
         */
        destroy: function (req, res) {
            var todo = new ToDoModel();
            //create a to do model variable, with the _id's value taken from the request
            todo._id = req.params.todo_id;

            //Delete the to do data
            todo.remove(function (err) {
                //If any error has occurred, it will be stored in err variable
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the todo'
                    });
                }

                // get and return all the todos after deletion
                getAll(function (err, todos) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err) {
                        res.send(err);
                    }
                    // return all todos in JSON format
                    res.json(todos);
                });
            });
        },

        /**
         * List of ToDos
         */
        all: function (req, res) {
            // use mongoose to get all todos in the database
            getAll(function (err, todos) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    res.send(err);
                }
                // return all todos in JSON format
                res.json(todos);
            });

        }
    };
};