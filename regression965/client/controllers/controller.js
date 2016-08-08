'use strict';
/*global angular */

/*
 AngularJS controllers control the data of AngularJS applications. AngularJS controllers are regular JavaScript Objects.
 AngularJS applications are controlled by controllers. The ng-controller directive defines the application controller.
 A controller is a JavaScript Object, created by a standard JavaScript object constructor.
 This is the controller which contains all the actions which has to be carried out from the UI.
 */
angular.module('moduleName',[])
    .controller('ControllerName',  ['$scope','ServiceInstance', function($scope, ServiceInstance) {
    }]);
