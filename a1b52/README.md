# AngularJS

AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you would otherwise have to write.

### Client File Structure
```
└── client
│      ├── assets
│      │   └── css
│      │   	    └── style.css
│      │   └── img
│      │
│      ├── controllers
│      │   └── controller.js
│      └── services
│      │   └── service.js
│      ├── tests
│      │   └── test.js
|      └── index.html
├── manifest.yml
└── package.json

```
### Files related to AngularJS
The application folder structure is modular, so that our controller and all of our $http requests are in separate files. Having all of the functionality in different modules helps to understand the overall layout of the application, hence the re-use and testing of code is easy.

```
index.html  # Includes all the scripts and styles and contains the HTML code to render the application.
```
**assets**
```
css         # Contains the styles information required for the UI
img         # Contains the static images which are displayed in the UI
```

**controller**
```
controller.js     # This is the Angular module containing the button actions and assigning of scope variables. This has all the code to get, create, update or delete an object inside our service.
```

**services**
```
service.js     # This is the service module and is meant to interact with our Node API. All the service calls are present in this file. This ensures that we can test this code separate of our overall application.
```


### Unit Testing

The unit tests in this application are written using jasmine . A sample template is given in the tests folder. This can be executed using *karma* tools or other testing tools and task runners can also be used.# Node Server
In this project, express module is used to create a server and the basic CRUD operations is given as node services. The following sections explain the technologies used and the usage of some of the important files present in the server code.


## Prerequisite Technologies

### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *PostgreSQL* - <a href="https://www.postgresql.org/download/linux/">Download</a> and Install PostgreSQL - <a href="https://www.postgresql.org/docs/">Checkout the manual</a> if you are just starting.

For using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```


### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *PostgreSQL* - Follow the great tutorial from the postgres site - <a href="https://www.postgresql.org/download/windows/">"Install PostgreSQL On Windows"</a>


### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.
* *PostgreSQL* - Follow the tutorial here - <a href="https://www.postgresql.org/download/macosx/">Install PostgreSQL on OSX</a>

## Server File Structure
  ```
└── server
│       ├── config
│       │  └── node_starter_kit_config.json
│       │  └── QueryConstants.json
│       ├── controllers
│       │  └── DBHandler.js
│       │  └── BusinessLogicHandler.js
│       │  └── LogHandler.js
│       ├── tests
│       │  └── test.js
│       └── vcap_parser
│       │  └── environment_parser.js
│       └── routes.js
├── app.js
├── manifest.yml
└── package.json
```
**app.js**

This file contains the server object and is the base of the project. It is the starting point of the application and starts the server.
By default, the server listens at the port which is defined in the environment variable named *PORT*. If this is not defined, *3000* is taken as the default port.
The server port can be set to either the environment variable or some other value of choice.
  ```
    app.set('port', process.env.PORT || 3000);
  ```

  In case of malicious attacks or mistyped URLs, the error is handled and *404 Page Not Found Error* is thrown.

    app.use(function (req, res) {
      res.status(404);
      res.send({error: 'Page Not found'});
      return;
    });
**route.js**

This file contains all the routes and matches them with the appropriate handler function.
The server code implements sample GET, POST, PUT, and DELETE services in this template.




### PostgreSQL

PostgreSQL, often simply Postgres, is a powerful, open-source, highly-customizable, object-relational database. It is a feature-rich enterprise database with JSON support, giving you the best of both the SQL and NoSQL worlds. It can handle workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users. The sample tenplate provided performs basic CRUD operations.
In this application the seneca plugins are used to connect to Postgre server. The storage engine named "seneca-postgres-store" is used to persist data in PostGre server.


#### Files related to PostgreSQL

The crux of the DB operations are present in the DBHandler file, present in the controllers directory. The database connection establishment and the CRUD operations are given in this file.

**QueryConstant**   
This file contains the constant values of the store name and the initial queries (create table queries) to be called after connecting to the database. It is present in the config directory.

**DBHandler**   
Database operations are done here. The operations are done based on the events received from the BusinessLogicHandler. The code to connect to the server and perform basic CRUD operations are done in this file. It takes the input as the table name and data to be manipulated.


**LogHandler**
Logging operations are done here. This file has a utility function which takes the log level and the message to be logged as the input and logs to the console output.

**BusinessLogicHandler**
Business logic like response handling and error handling operations are done here. This is the file which contains handling of the requests like validation and forming of model objects and sends it to the DBHandler file. The error or response sent back from the DBHandler is sent to the client in the appropriate format.
This file creates events for each action type which is caught by the DBHandler.



## Deploying the application

The Application can be run locally or deployed in cloud foundry and in both scenarios PostgreSQL service has to be integrated with the application.

### Deploying the application locally

In order to run the app locally, the *local_environment_parser.js* file, present in the vcap_parser directory, has to be changed according to the local DB information.

Replace the following line accordingly

`    return {
         uri:'postgres://username:password@host:5432/database_name'
     };`
     
Rename the *local_environment_parser* to *environment_parser*.

### Deploying to Cloud Foundry
The following denotes the steps required to deploy the application to PAAS systems like Pivotal and Bluemix.
When deployed in the cloud foundry through starter kit, there are no changes to be done in the code. When deploying to the Cloud foundry manually, the environment_parser.js must be replaced with the appropriate file provided for the PAAS and the node_starter_kit_config.json (present in the root folder) must contain the required “service instance name”  which was created in cloud foundry .

`  "service_name":"ElephantSQL", //The service instance name created in cloud foundry `


##### Logging in to Cloud Foundry
  - For Pivotal Web Services follow the below CLI commands for login :

```sh
$ cf login -a api.run.pivotal.io
```
  - For IBM Bluemix Web Services follow the below CLI commands :
```sh
$ cf login -a api.ng.bluemix.net
```

##### Creating ElephantSQL service

 IBM Bluemix & Pivotal Web Services offer a free ElephantSQL service.
  - If you are using IBM Bluemix, run
```sh
$ cf create-service ElephantSQL Tiny Turtle service_instance_name
$ cf bind-service AppName service_instance_name
```
  - If you are using Pivotal Web Services, run
```sh
$ cf create-service ElephantSQL turtle service_instance_name
$ cf bind-service AppName service_instance_name
```

##### Manifest


Application manifests tell cf push what to do with applications. This includes everything from how many instances to create and how much memory to allocate to what services applications should use.

A manifest can help you automate deployment, especially of multiple applications at once.

By default, the cf push command deploys an application using a manifest.yml file in the current working directory.


###### Example Manifest:


Manifests are written in YAML. The manifest below illustrates some YAML conventions, as follows:

* The manifest may begin with three dashes.
* The applications block begins with a heading followed by a colon.
* The application name is preceded by a single dash and one space.
* Subsequent lines in the block are indented two spaces to align with name.


```
applications:

- name: nifty-gui
  memory: 512M
  host: nifty
```

A minimal manifest requires only an application name. To create a valid minimal manifest, remove the memory and host properties from this example.


###### Disk quota attribute:


Use the disk_quota attribute to allocate the disk space for your app instance. 


```
disk_quota: 1024M
```


###### Domain attribute:


Every cf push deploys applications to one particular Cloud Foundry instance. Every Cloud Foundry instance may have a shared domain set by an admin. Unless you specify a domain, Cloud Foundry incorporates that shared domain in the route to your application.

You can use the domain attribute when you want your application to be served from a domain other than the default shared domain.


```
domain: unique-example.com
```


###### Instances attribute:


Use the instances attribute to specify the number of app instances that you want to start upon push:


```
instances: 2
```


###### Memory attribute:


Use the memory attribute to specify the memory limit for all instances of an app.  For example:

```
  memory: 1024M
```


The default memory limit is 1G. You might want to specify a smaller limit to conserve quota space if you know that your app instances do not require 1G of memory.


###### Host attribute:


Use the host attribute to provide a hostname, or subdomain, in the form of a string. This segment of a route helps to ensure that the route is unique. If you do not provide a hostname, the URL for the app takes the form of APP-NAME.DOMAIN.


```
host: my-app
```

##### Pushing the application to cloud foundry

The following command has to be executed to push the application to cloud foundry.

```sh
$ cf push <app name>
```
Use the following command from your root directory to push the application to cloud foundary using the *manifest.yml*.

```sh
$ cf push
```


## Unit Testing

The test cases are given in the test folder. A sample template written using *mocha* and *chai* is given. It can be run using the mocha tool or any other test case tools can also be used.
