"use strict";
var config = require('../config/node_starter_kit_config');
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv('VCAP_SERVICES');

/**
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {};
    returnObject.url = 'mongodb://localhost:27017/DataBaseName';
    return returnObject;

};

