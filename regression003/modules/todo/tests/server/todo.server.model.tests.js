'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  expect = require('expect.js'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo');

/**
 * Globals
 */
var todo;

/**
 * Unit tests
 */
describe('Todo Model Unit Tests:', function () {
  beforeEach(function (done) {
    todo = new Todo({
      task_name: 'Todo Name'
    });

    done();
  });

  describe('Method Save', function () {

    it('should be able to save without problems', function (done) {
      todo.task_name = 'ToDo number one';
      this.timeout(0);
      return todo.save(function (error, data) {
        expect(error).to.be(null);
                //Check if the inserted data is null
        expect(data.task_name).to.equal('ToDo number one');
        done();
      });

    });

    it('should be able to show an error when try to save without task_name', function (done) {
      this.timeout(0);
      todo.task_name = '';
      return todo.save(function (error) {
        expect(error).to.not.be(null);
        done();
      });
    });


  });
  describe('Method Get All', function () {
    it('should be able to retrieve all ToDo without any problem', function (done) {
      this.timeout(0);
      return Todo.find(function (error, todo) {
        expect(error).to.be(null);
                //Since a previous insert has been done, there should be atleast one todo in the database
        expect(todo.length).to.be.above(0);
                //Check if the list of datas has the data which we have inserted.
        var isDataExists = 0;
        for (var i = todo.length - 1; i > -1; i--) {
          if (todo[i].task_name === 'ToDo number one') {
            isDataExists = 1;
          }
        }
        expect(isDataExists).to.be(1);
        done();
      });

    });

  });
  describe('Method Update', function () {

    it('should be able to update without problems', function (done) {
      this.timeout(0);
      todo.task_name = 'ToDo number two';
      return todo.save({
        _id: todo.id
      }, function (error, toDoObject) {
        expect(error).to.be(null);
                //Check if the updated value is reflected
        expect(toDoObject.task_name).to.equal('ToDo number two');
        done();
      });

    });

  });
  describe('Method Delete', function () {

    it('should be able to delete without problems', function (done) {
      this.timeout(0);

      return Todo.remove({
        _id: todo.id
      }, function (error) {
        expect(error).to.be(null);
        done();
      });

    });

  });

  after(function (done) {
    Todo.remove().exec(function () {
      done();
    });
  });
});

