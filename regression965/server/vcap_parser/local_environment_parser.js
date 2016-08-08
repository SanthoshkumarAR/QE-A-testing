"use strict";


/**
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {};
    return {
        name: 'Database_Name',
        host: 'localhost',
        username: 'username',
        password: '****',
        port: 3306
    };

};

