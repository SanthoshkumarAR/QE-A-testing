'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
// Constants Messages
var TASK_ID_MESSAGE = 'Task ID is not valid';
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
      status: 'Success',
      data: data
    });
  }
  else {
    return response.status(500).json({
      status: 'Error',
      data: data
    });
  }
}
/**
 * Create a Todo
 */
exports.create = function (req, res) {
  var todo = new Todo(req.body);
  todo.user = req.user;

  todo.save(function (err) {
    if (err) {
      responseHandler(res, false, errorHandler.getErrorMessage(err));

    } else {
      responseHandler(res, true, todo);
    }
  });
};

/**
 * Show the current Todo
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
  var todo = req.todo ? req.todo.toJSON() : {};

  responseHandler(res, true, todo);
};

/**
 * Update a Todo
 */
exports.update = function (req, res) {
  var todo = req.todo;

  todo = _.extend(todo, req.body);

  todo.save(function (err) {
    if (err) {
      responseHandler(res, false, errorHandler.getErrorMessage(err));
    } else {
      responseHandler(res, true, todo);
    }
  });
};

/**
 * Delete an Todo
 */
exports.delete = function (req, res) {
  var todo = req.todo;

  todo.remove(function (err) {
    if (err) {
      responseHandler(res, false, errorHandler.getErrorMessage(err));
    } else {
      responseHandler(res, true, todo);
    }
  });
};

/**
 * List of Todos
 */
exports.list = function (req, res) {
  Todo.find().sort('-created').populate('user', 'displayName').exec(function (err, todos) {
    if (err) {
      responseHandler(res, false, errorHandler.getErrorMessage(err));
    } else {
      responseHandler(res, true, todos);
    }
  });
};

/**
 * Todo middleware 
 * Check if the todo id exists in db
 */
exports.todoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    responseHandler(res, false, TASK_ID_MESSAGE);
  }
  else {
    Todo.findById(id).populate('user', 'displayName').exec(function (err, todo) {
      if (err) {
        responseHandler(res, false, err);
      } else if (!todo) {
        responseHandler(res, false, TASK_ID_MESSAGE);
      }
      else {
        req.todo = todo;
        next();
      }
    });
  }
};
