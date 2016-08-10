(function () {
  'use strict';

  angular
    .module('todo')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('todo', {
        abstract: true,
        url: '/todo',
        template: '<ui-view/>'
      })
      .state('todo.list', {
        url: '',
        templateUrl: 'modules/todo/client/views/list-todo.client.view.html',
        controller: 'TodosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Todos List'
        }
      })
      .state('todo.create', {
        url: '/create',
        templateUrl: 'modules/todo/client/views/form-todo.client.view.html',
        controller: 'TodosController',
        controllerAs: 'vm',
        resolve: {
          todoResolve: newTodo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Todos Create'
        }
      })
      .state('todo.edit', {
        url: '/:todoId/edit',
        templateUrl: 'modules/todo/client/views/form-todo.client.view.html',
        controller: 'TodosController',
        controllerAs: 'vm',
        resolve: {
          todoResolve: getTodo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Todo {{ todoResolve.name }}'
        }
      })
      .state('todo.view', {
        url: '/:todoId',
        templateUrl: 'modules/todo/client/views/view-todo.client.view.html',
        controller: 'TodosController',
        controllerAs: 'vm',
        resolve: {
          todoResolve: getTodo
        },
        data:{
          pageTitle: 'Todo {{ articleResolve.name }}'
        }
      });
  }

  getTodo.$inject = ['$stateParams', 'TodosService'];

  function getTodo($stateParams, TodosService) {
    return TodosService.get({
      todoId: $stateParams.todoId
    }).$promise;
  }

  newTodo.$inject = ['TodosService'];

  function newTodo(TodosService) {
    return new TodosService();
  }
})();
