### To Do sample application

The "to Do" custom package is created using MEAN framework in order to showcase a CRUD model, which inserts, retrieves
and deletes a text from the Mongo database.
This package also features a UI created in Angular js, which contains the following components
    1. A text box to get input from the user. the input is sent in a POST request to the node server component, which
        inserts the text to the database.
    2. The list of to dos inserted in the database is displayed. This data is retrieved using GET service call to the
        node server component.
    3. A checkbox is displayed along with each to do, which calls the delete service when selected.

The test cases for the CRUD operations are present in the tests folder of the server component. These test cases are
executed using .

$ gulp test

The results for the tests are present in the /test/results/ folder.
The code coverage is also recorded, along with the test results in the /test/results/coverage folder.
# About the Framework – Mean.IO
MEAN is a framework for an easy starting point with MongoDB, Node.js, Express, and AngularJS based applications. It is designed to give you a quick and organized way to start developing MEAN based web apps.
 
# About the App
 
  The "ToDo" App is a simple application which will do basic Create, Read and Delete operations. It allows to add and persist ToDos
  that you need to get done. As you complete different  tasks in todo list you can delete them from the list.
  The  tasks in the todo list are stored in a database.
 
  - UI contains the following components:
    - A text box to get input from the user. The input is sent in a POST request to the  server component, which inserts the text to the database.
    - The list of To-do’s inserted in the database is displayed. This data is retrieved using GET service call to the server component.
    - Delete icon with each To-do entry to delete the entry from database using the DELETE service call.
 
##  File structure
    ├── README.md
    ├── app.js
    ├── package.json
    ├── public
    │   ├── assets
    │   │   ├── css
    │   │   │   └── toDo.css
    │   │   └── img
    │   │       └── logo.png
    │   ├── controllers
    │   │   └── toDo.js
    │   ├── routes
    │   │   └── toDo.js
    │   ├── services
    │   │   └── toDo.js
    │   ├── tests
    │   │   └── toDo.spec.js
    │   └── views
    │       └── index.html
    └── server
        │
        ├── controllers
        │   └── toDo.js
        ├── models
        │   └── toDoModel.js
        ├── routes
        │   └── toDo.js
        ├── tests
        │   └── toDo.spec.js
        └── views
            └── index.html
 
### Files related to ToDo package
 
 
Packages are registered in the app.js, defines package name, version in the package.json.
 
 
#### Public
 
All of the Client side code resides in the /public directory.
```
--- assets        # JavaScript/CSS/Images (not aggregated)
--- controllers   # Angular controllers
--- config        # Contains routing files
--- services      # Angular services (also directive and filter folders)
--- views         # Angular views
```
 
#### Server
All of the Server side code resides in the /server directory.
```
--- config        # Configuration files
--- controllers   # Server side logic goes here
--- models        # Database Schema Models
--- routes        # Rest api endpoints for routing
--- views         # Swig based html rendering
```
 
All JavaScript within public is automatically aggregated with the exception of files in public/assets, which can be manually added using the aggregateAsset() function.
 
## Prerequisite Technologies
 
- <a href="http://nodejs.org>Node.js</a> - Download and Install Node.js, node school has free node tutorials to get you started.
- <a href="https://www.mongodb.org/downloads>MongoDB</a> - Download and Install mongodb
 
 
 
## Deploying the application
 
The Application can be run locally or deployed in cloud foundry and in both scenarios MongoDB service has to be integrated with the application.
 
### Deploying the application locally
 
In order to run the app locally, the **environment_parser.js** file, present in the *vcap_parser* directory, has to be changed according to the local DB information.
 
Replace the following line accordingly
 
```
returnObject.url = 'mongodb://username:password@localhost/databaseName';
```
 
Install Node Modules
```
$ cd <myApp> && npm install
```
To starter server run:
```
$ node server
```
Open a browser and go to:
```
http://localhost:3000
```
 
### Deploying to Cloud Foundry
 
When deploying to the Cloud foundry manually,
- environment_parser.js must be replaced with the appropriate file provided for the PAAS
- node_starter_kit_config.json (present in the config folder) must contain the required “service instance name”  which was created in cloud foundry .
 
```
"service_name":"mongolab"
``` 
 
 
#### Login to Cloud Foundry
  - For Pivotal Web Services follow the below CLI commands for login :
 
```sh
$ cf login -a api.run.pivotal.io
```
  - For IBM Bluemix Web Services follow the below CLI commands :
```sh
$ cf login -a api.ng.bluemix.net
```
#### Creating Mongo DB service
 
IBM Bluemix & Pivotal Web Services offer a free MongoLabs service.
  - If you are using IBM Bluemix, run
```sh
$ cf create-service mongolab sandbox service_instance_name
```
```sh
$ cf bind-service AppName service_instance_name 
```
  - If you are using Pivotal Web Services, run
```sh 
$ cf create-service mongodb 100 service_instance_name
```
```sh
$ cf bind-service AppName service_instance_name 
```
 
## Manifest
 
Application manifests tell cf push what to do with applications. This includes everything from how many instances to create and how much memory to allocate to what services applications should use.
 
A manifest can help you automate deployment, especially of multiple applications at once.
 
By default, the cf push command deploys an application using a manifest.yml file in the current working directory.
 
 
#### Example Manifest
 
 
Manifests are written in YAML. The manifest below illustrates some YAML conventions, as follows:
 
• The manifest may begin with three dashes.
 
• The applications block begins with a heading followed by a colon.
 
• The application name is preceded by a single dash and one space.
 
• Subsequent lines in the block are indented two spaces to align with name.
 
 
```
 
applications:
 
- name: nifty-gui
 
  memory: 512M
 
  host: nifty
```
 
A minimal manifest requires only an application name. To create a valid minimal manifest, remove the memory and host properties from this example.
 
 
### Disk quota attribute
 
 
Use the disk_quota attribute to allocate the disk space for your app instance. This attribute requires a unit of measurement: M, MB, G, or GB, in upper case or lower case.
 
 
```
disk_quota: 1024M
```
 
 
### Domain attribute
 
 
Every cf push deploys applications to one particular Cloud Foundry instance. Every Cloud Foundry instance may have a shared domain set by an admin. Unless you specify a domain, Cloud Foundry incorporates that shared domain in the route to your application.
 
You can use the domain attribute when you want your application to be served from a domain other than the default shared domain.
 
 
```
domain: unique-example.com
```
 
 
### Instances attribute
 
 
Use the instances attribute to specify the number of app instances that you want to start upon push:
 
 
```
instances: 2
```
 
 
### Memory attribute:
 
 
Use the memory attribute to specify the memory limit for all instances of an app. This attribute requires a unit of measurement: M, MB, G, or GB, in upper case or lower case. For example:
 
```
  memory: 1024M
```
 
 
The default memory limit is 1G. You might want to specify a smaller limit to conserve quota space if you know that your app instances do not require 1G of memory.
 
 
### Host attribute:
 
 
Use the host attribute to provide a hostname, or subdomain, in the form of a string. This segment of a route helps to ensure that the route is unique. If you do not provide a hostname, the URL for the app takes the form of APP-NAME.DOMAIN.
 
 
```
host: my-app
```
 
## Pushing the application to cloud foundry
 
The following command has to be executed to push the application to cloud foundry.
 
```sh
$ cf push <app name>
```
Use the following command from your root directory to push the application to cloud foundary using manifest yml.
 
```sh
$ cf push
```
 
## Unit test case execution
 
The server and client folders have the “test” folder which contains the Mocha test cases. The unit tests are executed using gulp task runner tool. When the following command is given in the root directory, all the test cases for all packages are executed.
```
$ gulp test
```
The results for the client tests are present in the folder:
```
toDo/public/tests/
```
The results for the server tests are present in the folder:
```
toDo/server/tests/
```
 
## Code Coverage
 
The code coverage is also recorded, along with the test results and its details are available in folder:
```
/test/results/coverage folder.
```
 
## Code Analysis
 
Code Analysis is covered by JsLint.# Swagger for Mean.io #

This package provides the Swagger endpoints to your API.  It also hosts the Swagger-UI package which is available at 
/docs/ by default.

## Integrating Swagger with MEAN.IO

* The models should be defined in the **models.js** file. Each package should
have its own /docs folder and in that specify the models.js
* Specify each service in the **services.js** file within the **/docs** of the relevant package
See examples below


To use swagger in the cutom package, the package must depend on **swagger**. Add the following code in the register method of your app.js file.
```
swagger.add(__dirname);
```
Ensure **swagger.add(__dirname);** is written after **package.routes**

See examples below

```
package.routes(app, auth, database);
swagger.add(__dirname);
```

## Sample of models.js
```javascript
exports.models = {

    ToDo: {
        id: 'ToDo'
    },

    createToDO: {
        id: 'createToDO',
        required: ['task_name'],
        properties: {
            text: {
                type: 'string',
                description: 'Task Name'
            }
        }
    },

    deleteToDO: {
        id: 'deleteToDO',
        required: ['todo_id'],
        properties: {
            todo_id: {
                type: 'string',
                description: 'Task ID'
            }
        }
    }
};

```
## Sample of services.js

```javascript
'use strict';

exports.load = function (swagger) {

    var list, createToDo, deleteToDo;
    list = {
        'spec': {
            description: 'Get All ToDos',
            path: '/todos/',
            method: 'GET',
            summary: 'Get all ToDos',
            notes: '',
            type: 'ToDo',
            nickname: 'getToDos',
            produces: ['application/json']
        }
    };
    
    createToDo = {
        'spec': {
            description: 'Create a new ToDo Task.',
            path: '/todos',
            method: 'POST',
            summary: 'Create ToDo',
            notes: '',
            nickname: 'createToDO',
            produces: ['application/json'],
            parameters: [{
                name: 'body',
                description: 'Create a new ToDo Task.',
                required: true,
                type: 'createToDO',
                paramType: 'body',
                allowMultiple: false
            }]
        }
    };

    deleteToDo = {
        'spec': {
            description: 'Delete a ToDo Task.',
            path: '/todos/{todo_id}',
            method: 'DELETE',
            summary: 'Delete ToDo',
            notes: '',
            nickname: 'deleteToDO',
            produces: ['application/json'],
            parameters: [{
                name: 'todo_id',
                description: 'Delete a  ToDo Task.',
                required: true,
                type: 'deleteToDO',
                paramType: 'path',
                allowMultiple: false
            }]
        }
    };
    swagger.addGet(list);
    swagger.addPost(createToDo);
    swagger.addDelete(deleteToDo);
};

```
