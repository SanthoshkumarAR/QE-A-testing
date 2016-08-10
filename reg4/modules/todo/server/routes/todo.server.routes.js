'use strict';

/**
 * Module dependencies
 */
var todo = require('../controllers/todo.server.controller');
<!--$$Twilio_routes_require_TwilioHandler$$-->
<!--$$PushNotification_routes_require_NotificationHandler$$-->

module.exports = function(app) {

  <!--$$Twilio_routes_sendMessage$$-->

  // Todo Routes
  app.route('/api/todo')
    .get(todo.list)
    .post(todo.create);

  app.route('/api/todo/:todoId')
    .get(todo.read)
    .put(todo.update)
    .delete(todo.delete);

  // Finish by binding the Todo middleware
  app.param('todoId', todo.todoByID);
};
