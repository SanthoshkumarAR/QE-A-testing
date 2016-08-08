/*
 This file contains the test cases in order to test the working of CRUD operations in To do database
 */

// Module dependencies
var chai = require('chai');
//module which is used to conenct to the cassandra DB
const cassandra = require('cassandra-driver');
var nodeStarterConfig = require('../vcap_parser/environment_parser.js');
var env = nodeStarterConfig.getEnv();
var client= new cassandra.Client(env);
var should = chai.should();

var todoID=cassandra.types.Uuid.random();
/**
 * Test Suites
 */
describe('<Unit Test>', function() {

    describe('Method Insert', function () {
        it('should be able to insert without problems', function (done) {

            var insertQuery = 'INSERT INTO ToDo(id,task_name) VALUES (?,?)';
            client.execute(insertQuery,[ todoID,'task 1'], function(error, data) {
                should.not.exist(error);
                done();
            });
        });
    });

    describe('Method Update', function () {
        it('should be able to update without problems', function (done) {

            var updateQuery = 'UPDATE ToDo SET task_name = ? WHERE id = ?';
            client.execute(updateQuery, ['task 2', todoID], function(error, data) {
                should.not.exist(error);
                done();
            });
        });
    });

    describe('Method Get All', function () {
        it('should be able to get all tasks without any problem', function (done) {

            var getAllQuery = 'SELECT * FROM ToDo';
            client.execute(getAllQuery, null, function(error, data) {
                data.rows.should.have.length.above(0);
                done();
            });
        });
    });

    describe('Method Delete', function () {
        it('should be able to delete without problems', function (done) {

            var deleteQuery = 'DELETE FROM ToDo WHERE id = ?';
            client.execute(deleteQuery, [todoID], function(error, data) {
                should.not.exist(error);
                done();
            });
        });
    });
});
