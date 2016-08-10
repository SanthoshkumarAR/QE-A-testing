'use strict';
/*global angular */

/*
    This is the controller which contains all the actions which has to be carried out from the UI. The functions which
    are explained here include the getall, create and delete methods
*/
angular.module('mean.toDo')
    .controller('ToDoController', ['$scope', 'Todos',
        function ($scope, Todos) {
            //formData is the data entered in the text field which has to be empty initially
            $scope.formData = {};

            //function to toggle the buttons which are displayed in the view
            function toggleEdit(todo)
            {
                //Get all the four icon buttons from DOM
                var editButton = document.getElementById("icon1_" + todo._id);
                var edittxt=document.getElementById("icon5_" + todo._id);
                var trashButton = document.getElementById("icon2_" + todo._id);
                var trashtxt = document.getElementById("icon6_" + todo._id);
                var okButton = document.getElementById("icon3_" + todo._id);
                var oktxt = document.getElementById("icon7_" + todo._id);
                var cancelButton = document.getElementById("icon4_" + todo._id);
                var canceltxt = document.getElementById("icon8_" + todo._id);
                //When edit button is clicked isEditable is enabled and edit options must be displayed

                if (!todo.isEditable) {
                    editButton.style.display = "none";
                    edittxt.style.display = "none";
                    trashButton.style.display = "none";
                    trashtxt.style.display = "none";
                    okButton.style.display = "inline-block";
                    oktxt.style.display = "initial";
                    cancelButton.style.display = "inline-block";
                    canceltxt.style.display = "inline-block";
                }
                //When cancel/save button is clicked isEditable is disabled and delete/edit buttons must be displayed
                else
                {
                    okButton.style.display = "none";
                    oktxt.style.display = "none";
                    cancelButton.style.display = "none";
                    canceltxt.style.display = "none";
                    editButton.style.display = "inline-block";
                    edittxt.style.display = "inline-block";
                    trashButton.style.display = "inline-block";
                    trashtxt.style.display = "inline-block";
                }
                //Toggle the value, to show and hide the text box and save/cancel buttons
                todo.isEditable=!todo.isEditable;
            }


            /*
              loading is the variable which contained the Boolean value which indicates which the loading indicator
              should be displayed
            */
            $scope.loading = true;
            /* GET -
               when landing on the page, get all todos and show them
               use the service to get all the todos */
            Todos.get()
                .success(function (data) {
                    //assign the todos which are obtained from the service response to show in the UI
                    $scope.todos = data;
                    //Hide the loading indicator
                    $scope.loading = false;
                });

            /*
             This function is called when the edit button is clicked. The text box along with the save and cancel buttons
             are displayed according to the toggle value (isEditable)
             */
            $scope.toggleEdit = function (todo) {
                toggleEdit(todo);
            };

            /* CREATE -
               when submitting the add form, send the text to the node API */
            $scope.createTodo = function () {

                /* validate the formData to make sure that something is there
                   if form is empty, nothing will happen */
                if ($scope.formData.text !== undefined) {
                    //show the loading indicator when the create operation is called
                    $scope.loading = true;

                    // call the create function from our service (returns a promise object)
                    Todos.create($scope.formData)

                        // if successful creation, call our get function to get all the new todos
                        .success(function (data) {
                            $scope.loading = false;
                            // clear the form so our user is ready to enter another
                            $scope.formData = {};
                            // assign our new list of todos
                            $scope.todos = data;
                        });
                }
            };

            /*This function is called when the edited value has to be saved. A PUT service call is made to the server and
             the value is updated in the database
             */
            $scope.saveEdit = function (todo) {
                //show the loading indicator when the create operation is called
                $scope.loading = true;
                var toDoEdit = document.getElementById(todo._id);
                if(toDoEdit) {
                    // call the update function from our service
                    var updatetoDO = {"text": toDoEdit.value};

                    Todos.update(updatetoDO, todo._id)

                        // if successful creation, call our get function to get all the new todos
                        .success(function (data) {

                            todo.isEditable = !todo.isEditable;
                            $scope.loading = false;
                            // clear the form so our user is ready to enter another
                            $scope.formData = {};
                            // assign our new list of todos
                            $scope.todos = data;
                        });
                }
            };

            //This function is called when the edit is cancelled. The old value is replaced after cancel.
            $scope.cancelEdit = function (todo) {
                toggleEdit(todo);
                //Get the text box from DOM
                var toDoEdit = document.getElementById(todo._id);
                //Replace the old value in the text box
                toDoEdit.value=todo.text;

            };

            // DELETE
            // delete a todo after checking it
            $scope.deleteTodo = function (id) {
                //show the loading indicator when the delete operation is called
                $scope.loading = true;
                //Call the delete service with the id of the ToDo as input
                Todos.delete(id)
                    // if successful creation, call our get function to get all the new todos
                    .success(function (data) {
                        $scope.loading = false;
                        // assign our new list of todos
                        $scope.todos = data;
                    });
            };
        }]);
