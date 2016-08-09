'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Constants Messages
var TASK_MESSAGE = 'Task name must not be empty';
/**
 * Todo Schema
 */
var TodoSchema = new Schema({
  task_name: {
    type: String,
    default: '',
    required: TASK_MESSAGE,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Todo', TodoSchema);
