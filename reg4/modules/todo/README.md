# About the Framework – Mean.js
MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for MongoDB, Node.js, Express, and AngularJS based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.
 
# About the App

  The "ToDo" App is a simple application which will do basic CRUD operations. It allows to add and persist ToDos
  that you need to get done. As you complete different  tasks in todo list you can delete or edit them from the list.
  The  tasks in the todo list are stored in a database.

  - UI contains the following components:
    - A text box to get input from the user. The input is sent in a POST request to the  server component, which inserts the text to the database.
    - The list of To-do’s inserted in the database is displayed. This data is retrieved using GET service call to the server component.
    - Edit icon along with each To-do entry to update the input in the text box.
	  - On saving, this data is sent as a PUT request to the server component, which updates the text in the database.
	  - On cancelling, no operation takes place.
    - Delete icon with each To-do entry to delete the entry from database using the DELETE service call.
 
##  File structure

    ├── client
	│   ├── config
	│   │   └── todos.client.routes
    │   ├── controllers
    │   │   └── toDo.js
    │   ├── css
	│   │   └── toDo.js
    │   ├── img
	│   │   └── logo.png
    │   ├── services
    │   │   └── toDo.js
    │   ├── views
    │   │   └── index.html
	│   │   └── header.client.view.html
	│	└── todo.client.module.js
    └── server
    │   ├── config
	│	│   └── todo.server.config
    │   ├── controllers
    │   │   └── todo.server.controller.js
    │   ├── models
    │   │   └── todo.server.model.js
    │   └── routes
    │       └── todo.server.routes.js
	└── tests
        ├── client
		│   └── todo.client.tests.js
        └── server
            └── todo.server.model.tests.js	
			└── todo.server.routes.tests.js
			
### Files related to ToDo package

#### Client
All of the Client side code resides in the /client directory.
```
--- config        # Contains routing files
--- controllers   # Angular controllers
--- css		      # Contains styles for UI
--- img		      # Contains static image to be dispalyed on UI
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
```

#### Tests
All the testcases for client and server resides in the /test directory
 
## Prerequisite Technologies
 
- [Download](http://nodejs.org/download/) and Install Node.js, node school has free node tutorials to get you started.
- [Download](https://www.mongodb.org/downloads) and Install mongodb

## CRUD Module Sub-Generator

The CRUD module sub-generator will help you create a new CRUD module. To create a new CRUD module you will need to use yo again:
```
$ yo meanjs:crud-module modulename
```

This will create both AngularJS and Express files supporting full CRUD functionality, and add the Karma and Mocha tests.

To display the ToDo homepage, replace the templateURL in .\core.client.routes.js to
	
	templateUrl: 'modules/todo/client/views/index.html'

## Deploying the application
 
The Application can be run locally or deployed in cloud foundry and in both scenarios MongoDB service has to be integrated with the application.
 
### Deploying the application locally

Install Node Modules
```
$ cd <myApp> && npm install
```
To starter server run:
```
$ grunt
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
 
#### Manifest	
 
Application manifests tell cf push what to do with applications. This includes everything from how many instances to create and how much memory to allocate to what services applications should use.
 
A manifest can help you automate deployment, especially of multiple applications at once.
 
By default, the cf push command deploys an application using a manifest.yml file in the current working directory.
 
 
##### Example Manifest
 
 
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
 
 
##### Disk quota attribute
 
 
Use the disk_quota attribute to allocate the disk space for your app instance. This attribute requires a unit of measurement: M, MB, G, or GB, in upper case or lower case.
 
 
```
disk_quota: 1024M
```
 
 
##### Domain attribute
 
 
Every cf push deploys applications to one particular Cloud Foundry instance. Every Cloud Foundry instance may have a shared domain set by an admin. Unless you specify a domain, Cloud Foundry incorporates that shared domain in the route to your application.
 
You can use the domain attribute when you want your application to be served from a domain other than the default shared domain.
 
 
```
domain: unique-example.com
```
 
 
##### Instances attribute
 
Use the instances attribute to specify the number of app instances that you want to start upon push:
 
```
instances: 2
```
 
 
##### Memory attribute:
 
 
Use the memory attribute to specify the memory limit for all instances of an app. This attribute requires a unit of measurement: M, MB, G, or GB, in upper case or lower case. For example:
 
```
  memory: 1024M
```
 
 
The default memory limit is 1G. You might want to specify a smaller limit to conserve quota space if you know that your app instances do not require 1G of memory.
 
 
##### Host attribute:
 
 
Use the host attribute to provide a hostname, or subdomain, in the form of a string. This segment of a route helps to ensure that the route is unique. If you do not provide a hostname, the URL for the app takes the form of APP-NAME.DOMAIN.
 
 
```
host: my-app
```
 
#### Pushing the application to cloud foundry
 
The following command has to be executed to push the application to cloud foundry.
 
```sh
$ cf push <app name>
```
Use the following command from your root directory to push the application to cloud foundary using manifest yml.
 
```sh
$ cf push
```
 
## Unit test case execution
 
The “tests” folder contains the Mocha test cases for both client and server. The unit tests are executed using gulp task runner tool. When the following command is given in the root directory, all the test cases for all packages are executed.

For server testcases,run
```
$ gulp test_server
```

For DB testcases,run
```
$ gulp test_DB
```

For client testcases,run
```
$ gulp test_UI
```

## Code Coverage
 
The code coverage is also recorded, along with the test results and its details are available in folder:
```
/tests/results/coverage folder
```
 
## Code Analysis
 
Code Analysis is covered by JsLint.