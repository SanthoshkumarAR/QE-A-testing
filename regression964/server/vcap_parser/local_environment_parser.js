"use strict";


/**
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {};
    return {
        uri:'postgres://admin@localhost:5432/admin'
    };
};

