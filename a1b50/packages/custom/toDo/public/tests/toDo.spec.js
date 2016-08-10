'use strict';
/*
    This is the test file which contains the Mocha/jasmine tests and it tests the angular modules by mocking service
    responses
 */
(function() {

    // To DO Controller Spec
    describe('MEAN controllers', function() {
        describe('ToDoController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                jasmine.addMatchers({
                    toEqualData: function() {
                        return {
                            compare: function(actual, expected) {
                                return {
                                    pass: angular.equals(actual, expected)
                                };
                            }
                        };
                    }
                });
            });

            //Before each test, the module is declared
            beforeEach(function() {
                module('mean.toDo');
            });

            // Initialize the controller and a mock scope
            var ToDoController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();
                ToDoController = $controller('ToDoController', {
                    $scope: scope
                });
                $stateParams = _$stateParams_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;

            }));


            it('Initialisation must retrieve all the todos and assign to the scope variable', function() {

                //Sample response to get all todos service call
                var responseForInitialGetService = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        text: 'ToDo Task 1'
                    };
                };

                //test if the get service is called and send the sample response.
                $httpBackend.expectGET('\/api\/todos').respond(responseForInitialGetService());

                //flush pending requests
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.loading).toEqual(false);
                expect(scope.formData).toEqual({});
                //test if the todos list is assigned to the scope
                expect(scope.todos).toEqual(responseForInitialGetService());

            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ', function() {

                // POST data to be sent for the create service call
                var postData = function() {
                    return {
                        text: 'ToDo Task 2'
                    };
                };

                // fixture expected response data for the initial get service
                var responseForInitialGetService = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        text: 'ToDo Task 1'
                    };
                };

                // fixture expected response data for the get service after the post call
                var responseForPostRequest = function() {
                    return [{
                        _id: '525cf20451979dea2c000001',
                        text: 'ToDo Task 1'
                    },
                        {
                            _id: '525cf20451979dea2c000002',
                            text: 'ToDo Task 2'
                        }
                    ];
                };


                // fixture mock form input values
                scope.formData.text= 'ToDo Task 2';

                //Initially GET call to get all toDos is called when the page is loaded
                $httpBackend.expectGET('\/api\/todos').respond(responseForInitialGetService());

                // Run controller
                scope.createTodo(true);

                // test post request is sent
                $httpBackend.expectPOST('\/api\/todos', postData()).respond(responseForPostRequest());

                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.loading).toEqual(false);
                expect(scope.formData).toEqual({});
                //test if the response is assigned to the todos variable which displays the new list of todos
                expect(scope.todos).toEqual(responseForPostRequest());

            });

            it('$scope.deleteTodo() with valid form data should send a DELETE request ' +
                'with the form input values', function() {


                // fixture expected response data for the initial get service
                var responseForInitialGetService = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        text: 'ToDo Task 1'
                    };
                };


                // fixture expected response data for Delete request
                var responseToDeleteRequest = function() {
                    return [];
                };

                $httpBackend.expectGET('\/api\/todos').respond(responseForInitialGetService());

                // Run controller
                scope.deleteTodo('525cf20451979dea2c000001');

                // test delete request is sent
                $httpBackend.expectDELETE('\/api\/todos/525cf20451979dea2c000001').respond(responseToDeleteRequest());

                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.loading).toEqual(false);
                //test if the response is assigned to the todos variable which displays the new list of todos
                expect(scope.todos).toEqual(responseToDeleteRequest());

            });

        });
    });
}());
