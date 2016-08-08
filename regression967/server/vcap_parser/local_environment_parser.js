"use strict";

//Function which returns the environment details
module.exports.getEnv = function () {
    //contactPoints contains the list of URLs containing the Cassandra DB service
    //keyspace denotes the name of the keyspace/Database
    return  { contactPoints: ['localhost'], keyspace: 'keyspace_name'};
};

