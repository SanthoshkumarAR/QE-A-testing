/*global describe */
/*global beforeEach*/
/*global it */

/*
This file contains the test cases in order to test the working of CRUD operations in To do database
 */

'use strict';


// Module dependencies.
var expect = require('expect.js'),
    mongoose = require('mongoose'),
    ToDo = mongoose.model('ToDo');


/**
 * Globals
 */

var todo;

/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    describe('Model todo:', function () {
        //The following code is executed before each test case
        beforeEach(function (done) {
            //The timeout limit is set for each test case to be executed
            this.timeout(10000);
            //Initialising a todo variable to be used in each test case
            todo = new ToDo({
                text: 'ToDo number one'
            });
            done();
        });
        describe('Method Insert', function () {

            it('should be able to save without problems', function (done) {
                this.timeout(10000);

                return todo.save(function (err, data) {
                    expect(err).to.be(null);
                    expect(data.text).to.equal('ToDo number one');
                    done();
                });

            });

            it('should be able to show an error when try to save without text', function (done) {
                this.timeout(10000);
                todo.text = '';

                return todo.save(function (err) {
                    expect(err).to.not.be(null);
                    done();
                });
            });



        });
        describe('Method Get All', function () {

            it('should be able to retrieve all ToDos without any problem', function (done) {
                this.timeout(10000);
                return ToDo.find(function (err, todos) {
                    expect(err).to.be(null);
                    //Since a previous insert has been done, there should be atleast one todo in the database
                    expect(todos.length).to.be.above(0);
                    //Check if the last to do inserted has the data which we have inserted.
                    expect(todos[0].text).to.equal('ToDo number one');
                    done();
                });

            });

        });
        describe('Method Delete', function () {

            it('should be able to delete without problems', function (done) {
                this.timeout(10000);

                return ToDo.remove({
                    _id : todo.id
                }, function (err) {
                    expect(err).to.be(null);
                    done();
                });

            });

        });

    });
});
