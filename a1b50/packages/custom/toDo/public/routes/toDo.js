'use strict';
/*global angular */

/*
    This module contains all the routing information for different html pages in the UI. In this app there is only one
     page and hence only the index.html is displayed
*/
angular.module('mean.toDo').config(['$viewPathProvider',
    function ($viewPathProvider) {
        //Overriding the system index.html with our custom index.html file
        $viewPathProvider.override('system/views/header.html', 'toDo/views/header.html');
        $viewPathProvider.override('system/views/index.html', 'toDo/views/index.html');
    }
    ]);
