/*global describe */
/*global beforeEach*/
/*global it */

/*
 This file contains the test cases in order to test the working of CRUD operations in To do database
 */

'use strict';


// Module dependencies.


var mongoose = require("mongoose");
var config = require("../vcap_parser/environment_parser");
console.log('Connecting to DB '+config.getEnv().url);
mongoose.connect(config.getEnv().url);
var expect = require('expect.js'),
    Model = require('../models/model');


/**
 * Globals
 */

var entityObject;

/**
 * Test Suites
 */
describe('MongoDB Test Case:', function () {
    //The following code is executed before each test case
    beforeEach(function (done) {
        //The timeout limit is set for each test case to be executed
        this.timeout(10000);

        done();
    });
    describe('Method Insert', function () {

        it('should be able to save without problems', function (done) {
            //Initialising a object to be used in test case
            entityObject = new Model(/*with attributes initialised*/);
            return entityObject.save(function (error, data) {
                expect(error).to.be(null);
                /*Other tests to check if the value is inserted properly*/
                done();
            });

        });

    });
    describe('Method Get All', function () {

        it('should be able to retrieve all entities without any problem', function (done) {
            this.timeout(10000);
            return Model.find(function (error, entities) {
                expect(error).to.be(null);
                //Since a previous insert has been done, there should be atleast one object in the database
                expect(entities.length).to.be.above(0);
                //Check if the list of data has the data which we have inserted.
                done();
            });

        });

    });
    describe('Method Update', function () {

        it('should be able to update without problems', function (done) {
            this.timeout(10000);
            //Initialising a object to be used in test case
            entityObject = new Model(/*with attributes initialised*/);
            return entityObject.save({
                _id : entityObject.id
            }, function (error,toDoObject) {
                expect(error).to.be(null);
                //Check if the updated value is reflected
                done();
            });

        });

    });
    describe('Method Delete', function () {

        it('should be able to delete without problems', function (done) {
            this.timeout(10000);
            //Initialising a object to be used in test case
            entityObject = new Model(/*with attributes initialised*/);
            return Model.remove({
                _id : entityObject.id
            }, function (error) {
                expect(error).to.be(null);
                done();
            });

        });

    });

});
