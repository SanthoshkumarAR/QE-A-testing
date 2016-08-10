'use strict';
/*global describe */
/*global beforeEach*/
/*global it */

/*
 This is the test file which contains the Mocha/jasmine tests and it tests the angular modules by mocking service
 responses
 */
(function() {

    //Controller Spec
    describe('Custom Angular controllers', function() {
            //Before each test, the module is declared
            beforeEach(function() {
                angular.mock.module('moduleName');
            });


            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope,  _$httpBackend_) {
                    //Assign the variables needed to the objects passed.

            }));


            it('Test Case Description', function() {

                /*Test if the services are called and send the sample response, using $httpBackend.expectGET,
                $httpBackend.expectPOST,$httpBackend.expectPUT,$httpBackend.expectDELETE
                Test if the values are reflected appropriately using expect function*/

            });


    });
}());
