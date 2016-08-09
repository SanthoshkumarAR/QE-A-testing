'use strict';
/*
 This file handles all the routing to different controller operations, according to the URL hit
 */
// The Package is passed automatically as first parameter
module.exports = function (ToDo, app, auth, database) {
    var todoController = require('../controllers/toDo')(ToDo);
    //get all todo's from the database and send back after retrieving them
    app.get('/api/todos', todoController.all);
    // create todo and send back all todos after creation
    app.post('/api/todos', todoController.create);
    // update todo and send back all todos after creation
    app.put('/api/todos/:todo_id', todoController.update);
    // delete a todo
    app.delete('/api/todos/:todo_id', todoController.destroy);
};
