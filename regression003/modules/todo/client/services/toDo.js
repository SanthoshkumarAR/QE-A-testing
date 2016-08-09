'use strict';

/*global angular */

/*
 Module to make service calls to server component from UI component
 */

angular.module('toDo').factory('Todo', [
  '$http', function ($http) {
    return {
      get: function () {
                //Get all todo's from the service component
        return $http.get('/api/todo');
      },
      create: function (todoData) {
                //Create todo by making post call to the service component
        return $http.post('/api/todo', todoData);
      },
      update: function (todoData, id) {
                //Update todo by making put call to the service component
        return $http.put('/api/todo/' + id, todoData);
      },
      delete: function (id) {
                //Delete a todo by making a delete call to the service component
        return $http.delete('/api/todo/' + id);
      }
    };
  }
]);
