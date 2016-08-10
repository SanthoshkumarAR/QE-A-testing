'use strict';

/*global angular */

/*
    Module to make service calls to server component from UI component
*/

angular.module('mean.toDo').factory('Todos', [
    '$http', function ($http) {
        return {
            get : function () {
                //Get all todo's from the service component
                return $http.get('/api/todos');
            },
            create : function (todoData) {
                //Create todo by making post call to the service component
                return $http.post('/api/todos', todoData);
            },
            update : function (todoData,id) {
                //Update todo by making put call to the service component
                return $http.put('/api/todos/'+id, todoData);
            },
            delete : function (id) {
                //Delete a todo by making a delete call to the service component
                return $http.delete('/api/todos/' + id);
            }
        };
    }
]);
