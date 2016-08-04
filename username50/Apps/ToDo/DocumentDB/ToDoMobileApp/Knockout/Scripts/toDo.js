"use strict";
var baseURL = "Put your base url here";
// Method to Load all tasklist by making call to WEB API GET method
function loadToDoList() {
    $.ajax({
        type: "GET",
        url: baseURL + "/api/Todo",
        headers: { "ZUMO-API-VERSION": "2.0.0", "Content-Type": "application/json" },
        async: false
    }).done(function (result) {
        ko.applyBindings(new ToDoViewModel(result));
    }).fail(function (err) {
        alert(err.status);
    });
}
//construct an task
var Task = function (Id,Name) {
    this.Id = Id;
    this.Name = Name;
};
// The ViewModel where the Templates are initialized
var ToDoViewModel = function (tasklist) {
    var self = this;
    this.taskToAdd = ko.observable("");
    //Hide the loading indicator
    this.isLoading = ko.observable(false);
    this.tasklist = ko.observableArray(tasklist);
    this.selectedTask = ko.observable();
    // Method to insert new task
    this.addTask = function () {
        var newItem = "";
        if ($.trim(self.taskToAdd()) !== "") {
            // Adds the todo. Writing to the "tasklist" observableArray causes any associated UI to update
            var postData = {'Name': self.taskToAdd()};
            //Ajax request to create a new task
            $.ajax({
                url: baseURL+'/api/Todo',
                type: 'POST',
                headers: { "ZUMO-API-VERSION": "2.0.0" },
                data: postData,
                async: false
            }).done(function (result) {
                newItem = new Task(result.Id, result.Name);
                self.tasklist.push(newItem);
            }).fail(function (err) {
            });
            // Clears the text box, because it's bound to the "taskToAdd" observable
            self.taskToAdd("");
        }       
    };
    // Method to Delete the Record
    this.deleteTask = function (taskToDelete) {
        $.ajax({
            type: "delete",
            url: baseURL+ "/api/Todo/" + taskToDelete.Id,
            headers: { "ZUMO-API-VERSION": "2.0.0" },
            async: false
        }).done(function (data) {
        }).fail(function (err) {
        });
        self.tasklist.remove(taskToDelete);
        self.selectedTask(null);
    };
    // Toggle edit for Save or Cancel
    this.editTask = function (todo) {
        self.selectedTask(todo);
    };
    // Method to Update the Record
    this.acceptTaskEdit = function () {
        //Edit the Record
        $.ajax({
            type: "put",
            url: baseURL+ "/api/Todo",
            headers: { "ZUMO-API-VERSION": "2.0.0" },
            async: false,
            data: {"Id":self.selectedTask().Id , "Name":self.selectedTask().Name}
        }).done(function (data) {
        }).fail(function (err) {
        });
        self.selectedTask(null);
    };
    //Function to cancel edit effect
     this.cancelTaskEdit = function () {
        self.selectedTask(null);
		$.ajax({
			type: "GET",
			url: baseURL + "/api/Todo",
			headers: { "ZUMO-API-VERSION": "2.0.0", "Content-Type": "application/json" },
			async: false
		}).done(function (result) {
			self.tasklist = ko.observableArray(result);
            ko.cleanNode(document.getElementById("ToDoRowKnockout"));
            ko.applyBindings(self, document.getElementById("ToDoRowKnockout"));
		}).fail(function (err) {
			alert(err.status);
		});
    };
    // Method to decide the Current Template (readonlyTemplate or editTemplate)
    this.templateToUse = function (todo) {
        return self.selectedTask() === todo ? "editMode" : "readOnly";
    };
};
// On initial page load to get the tasklist
loadToDoList();
