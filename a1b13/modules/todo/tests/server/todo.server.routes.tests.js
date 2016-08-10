'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  express = require(path.resolve('./config/lib/express')),
  app = express.init(mongoose),
  agent = request.agent(app);
// Constants Messages
var TASK_MESSAGE = 'Task name must not be empty';
var TASK_ID_MESSAGE = 'Task ID is not valid';

/**
 * Globals
 */
var todo;

/**
 * Todo routes tests
 */
describe('Todo CRUD tests', function () {
  beforeEach(function (done) {
    todo = {
      task_name: 'Todo name'
    };

    done();
  });
  it('should be able to save a Todo', function (done) {
        // Save a new Todo
    agent.post('/api/todo')
            .send(todo)
            .expect(200)
            .end(function (todoSaveErr, todoSaveRes) {
                // Handle Todo save error
              if (todoSaveErr) {
                return done(todoSaveErr);
              }

                // Get a list of Todo
              agent.get('/api/todo')
                    .end(function (todosGetErr, todosGetRes) {
                        // Handle Todo save error
                      if (todosGetErr) {
                        return done(todosGetErr);
                      }

                        // Get Todo list
                      var todo = todosGetRes.body.data;

                        // Set assertions
                      (todo[0].task_name).should.match('Todo name');

                        // Call the assertion callback
                      done();
                    });
            });
  });
  it('should not be able to save a Todo if no name is provided', function (done) {
        // Invalidate name field
    todo.task_name = '';
        // Save a new Todo
    agent.post('/api/todo')
                    .send(todo)
                    .expect(500)
                    .end(function (todoSaveErr, todoSaveRes) {
                        // Set message assertion
                      (todoSaveRes.body.data).should.match(TASK_MESSAGE);

                        // Handle Todo save error
                      done(todoSaveErr);
                    });
  });
  it('should be able to update a Todo', function (done) {
        // Save a new Todo
    todo.task_name = 'task one';
    agent.post('/api/todo')
            .send(todo)
            .expect(200)
            .end(function (todoSaveErr, todoSaveRes) {
                // Handle Todo save error
              if (todoSaveErr) {
                return done(todoSaveErr);
              }

                // Update Todo name
              todo.task_name = 'Updated Todo name';
                // Update an existing Todo
              agent.put('/api/todo/' + todoSaveRes.body.data._id)
                    .send(todo)
                    .expect(200)
                    .end(function (todoUpdateErr, todoUpdateRes) {
                        // Handle Todo update error
                      if (todoUpdateErr) {
                        return done(todoUpdateErr);
                      }

                        // Set assertions
                      (todoUpdateRes.body.data._id).should.equal(todoSaveRes.body.data._id);
                      (todoUpdateRes.body.data.task_name).should.match('Updated Todo name');

                        // Call the assertion callback
                      done();
                    });
            });
  });


  it('should be able to get a list of Todo', function (done) {
        // Create new Todo model instance
    var todoObj = new Todo(todo);

        // Save the todo
    todoObj.save(function () {
            // Request Todo
      request(app).get('/api/todo')
                .end(function (req, res) {
                    // Set assertion
                  res.body.data.should.be.instanceof(Array).and.have.lengthOf(1);

                    // Call the assertion callback
                  done();
                });

    });
  });

    it('should be able to get a single Todo if not signed in', function (done) {
        // Create new Todo model instance
        var todoObj = new Todo(todo);

        // Save the Todo
        todoObj.save(function () {
            request(app).get('/api/todo/' + todoObj._id)
                .end(function (req, res) {
                    // Set assertion
                    res.body.data.should.be.instanceof(Object).and.have.property('task_name', todo.task_name);

                    // Call the assertion callback
                    done();
                });
        });
    });

  it('should be able to delete a Todo', function (done) {
        // Create new Todo model instance
    var todoObj = new Todo(todo);

        // Save the Todo
    todoObj.save(function () {
            // Try deleting Todo
      request(app).delete('/api/todo/' + todoObj._id)
                .expect(200)
                .end(function (todoDeleteErr, todoDeleteRes) {
                    // Handle Todo update error
                  if (todoDeleteErr) {
                    return done(todoDeleteErr);
                  }

                    // Handle Todo error error
                  done();
                });

    });
  });
    it('should return proper error for single Todo with an invalid Id, if not signed in', function (done) {
        // test is not a valid mongoose Id
        request(app).get('/api/todo/test')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('data', TASK_ID_MESSAGE);

                // Call the assertion callback
                done();
            });
    });
    it('should return proper error for single Todo which doesnt exist, if not signed in', function (done) {
        // This is a valid mongoose Id but a non-existent Todo
        request(app).get('/api/todo/559e9cd815f80b4c256a8f41')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('data', TASK_ID_MESSAGE);

                // Call the assertion callback
                done();
            });
    });

  afterEach(function (done) {
    Todo.remove().exec(done);
  });
});
