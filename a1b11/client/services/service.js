'use strict';

/*global angular */

/*
 Module to make service calls to server component from UI component.
 The $http service is one of the most common used services in AngularJS applications.
 The service makes a request to the server, and lets your application handle the response.
 */

angular.module('moduleName').factory('ServiceInstanceName', [
    '$http', function ($http) {
        return {
            //perform some functions with $http like $http.get, $http.put, $http.post, $http.delete
        };
    }
]);
