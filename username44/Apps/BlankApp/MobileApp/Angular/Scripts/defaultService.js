'use strict';

/*global angular */

/*
    Module to make service calls to server component from UI component
*/

angular.module('toDo').factory('Todos', [
    '$http', function ($http) {
        return {
           //Here you can put your api call
        };
    }
]);
