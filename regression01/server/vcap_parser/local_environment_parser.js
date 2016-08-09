"use strict";


/**
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {};
    returnObject.url = 'mongodb://username:passwor@localhost/DataBaseName';
    return returnObject;

};

