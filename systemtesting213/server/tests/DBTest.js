"use strict";
var pg = require('pg');
var should = require('chai').should();
/**
 * To get the DB details running in localhost or from vcap service
 */
var nodeStarterConfig = require('../vcap_parser/environment_parser');
var dbEnv = nodeStarterConfig.getEnv();
/**
 * db to use one connection per test
 * recordId to get the newly inserted unique id
 * initialRecord is new record to be inserted
 * @type {string}
 */
var db = "",
    initialRecord = "task_new",
    recordId = "",
    updateRecord = "task_updated";
/**
 * ToDo test suite
 */
describe('Postgres-DB-Unit Test', function () {
    before(function (before_done) {
        var conString = dbEnv.url;
        pg.connect(conString, function (err, client, done) {
            if (err) {
                throw err;
            }
            db = client;
            var createTableQuery = "CREATE TABLE IF NOT EXISTS ToDo" +
                "(" +
                "task_name character varying(50)," +
                "_id serial NOT NULL PRIMARY KEY" +
                ")";
            db.query(createTableQuery, function (err, data) {
                if (err) {
                    throw err;
                }
                done();
                before_done();
            });
        });
    });
    describe('CRUD operations', function () {
        /**
         * ToDo test cases
         */
        it('should be able to Insert record', function (done) {
            db.query("INSERT INTO ToDo (task_name) VALUES ($1) RETURNING *", [initialRecord], function (err, result) {
                if (err) {
                    throw err;
                }
                /**
                 * inserted record result must have key task_name
                 * Confirm that that an error does not exist
                 * Inserted record matches with the user input
                 */
                result.rows[0].should.have.property('task_name');
                should.not.exist(err);
                // After insertion, checking the inserted data
                recordId = result.rows[0]._id;
                should.equal(initialRecord, result.rows[0].task_name);
                done();
            });
        });
        it('should be able to retrieve all records', function (done) {
            // Retrieve the data to insert from the POST body
            db.query("SELECT * FROM ToDo WHERE _id=$1", [recordId], function (err, result) {
                if (err) {
                    throw err;
                }
                // Confirm that that an error does not exist
                should.not.exist(err);
                // After updating, result will give the updated count
                should.exist(result);
                done();
            });
        });
        it('should be able to Update record', function (done) {
            // Retrieve the data to insert from the POST body
            db.query("UPDATE ToDo SET task_name=($1) WHERE _id=($2) RETURNING *", [updateRecord, recordId], function (err, result) {
                if (err) {
                    throw err;
                }
                // Confirm that that an error does not exist
                should.not.exist(err);
                should.exist(result);
                // After updating, initial record will not match the updated record
                should.not.equal(initialRecord, updateRecord);
                done();
            });
        });
        it('should be able to delete record', function (done) {
            // Retrieve the data to insert from the POST body
            db.query("DELETE FROM ToDo WHERE _id=($1)", [recordId], function (err, result) {
                if (err) {
                    throw err;
                }
                // Confirm that that an error does not exist
                should.not.exist(err);
                should.exist(result);
                // Once deleted, the record count will be 0
                should.not.equal(1, result.rows.length);
                done();
            });
        });
    });
    /**
     * Close DB connection after completion of CRUD suite
     */
    after(function (done) {
        //After all CRUD operations, close db connection
        db.end();
        done();
    });
});
