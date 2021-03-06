"use strict";
var config = require('../config/node_starter_kit_config');
var cfenv = require("cfenv");
/*getAppEnv gets the core bits of Cloud Foundry data as an object.
 The object value of the key "VCAP_SERVICES" present in the environment variable, is returned and stored in "appEnv"*/
var appEnv = cfenv.getAppEnv('VCAP_SERVICES');

/**
 * Parse VCAP services objects, based on service type
 * @return db details as returnObject
 */

module.exports.getEnv = function () {
    var returnObject = {}, service_name = config.service_name, creds;
    if (service_name) {
        creds = appEnv.getServiceCreds(config.service_name);
    }
    if (creds) {
        returnObject.uri = creds.uri;
    }
    return returnObject;
};

