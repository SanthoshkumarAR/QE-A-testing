# About the Framework – ASP.NET MVC Blank Mobile

The ASP.NET MVC framework is a template provided by Microsoft, which implements the model–view–controller (MVC) pattern and exposes an API.

## About the App

 The "Blank App" is created using ASP.NET MVC Mobile framework in order to showcase a App that will do CRUD operations using a database and to demonstrate other Mobile app functionalities.
 
 ## Prerequisites
  - Visual Studio
  - Microsoft Azure SDK 
  - Azure subscription 
  
## Folder Structure
  - DataAccessLayer
  	- Contract
  	- Models
  	- Repository
  - Domain
  - Notifications
  	- Controller
  	- Models
  - BusinessLogic
  - App
  	- App_Start  	
		
### Data Access Layer 

This is data access layer, which will interact with the database. Connection Strings should be configured in Web.Config. Database context will be created using this connection strings and database call will be invoked.

### Domain layer

This layer contains the domain model which is used in the application. In this we have used DataAnnotations for validing user input.

### Business Logic layer

This layer is responsible for implementing business logic and conversion to / from DAL and Domain models. In this we have used auto mapper to do mapping between Domain and DAL models.

### App Layer

This is a Mobile application using MVC 5 architecture.
  
## How to run the application in your local machine:

- Add/Update connection details of the database in Web.Config.
- Build and Run the solution

## Deploying to Azure

- Select the WebApp which needs to be Hosted in Server
- Right Click on the Project and choose "Publish"
- Choose/Create new Deployment profile
- Update Connetion/Settings if any
- Verify the package which is being deployed using Preview
- Click "Publish"
# About Azure DocumentDB

Azure DocumentDB is a fully managed NoSQL database service built for fast and predictable performance, high availability, automatic scaling, and ease of development. Its flexible data model, consistent low latencies, and rich query capabilities make it a great fit for web, mobile, gaming, and IoT, and many other applications that need seamless scale.

## To Run the application in Local machine

- Update the Server Key values in Web.Config AppSettings section

>     <add key="endpoint" value="<<EndPoint_Name>>"/>
>     <add key="authKey" value="<<Aunthentication_Key>>/>
>     <add key="database" value="<<DB_Name>>"/>
>     <add key="collection" value="<<Collection_Name>>"/>

## How DocumentDB is used in this ToDo App?

In this Blank app, the functionalities are seperated by layers. And DAL is responsible for making the communication with DocumentDB. 

- DAL
  	- Contract
		IRepository - Generic functionalities of DocumentDB method declarations
		Repository  - Implementations of generic methods
   	
	- Models
		ToDoItem - Model object. (Note: Add model objects here to extend this application)

   	- Repository
		IToDoRepository - Functionalities specific to ToDoItem object are declared here. This interface should have to inherit IRepository
		ToDoRepository  - Method Implementations of ToDoItem is defined here. This class should implement IToDoRepository

## Steps to Extend the application functionalities

	- Create new model object under DAL - Models folder
	- Create new Object specific repository class and interfaces
	- Inherit the Object specific interface from IRepository interface
	- Override the functionalities in the new class and make a call to the methods of Repository class

﻿# Azure Blob Storage

Azure Blob storage is a service for storing large amounts of unstructured object data, such as text or binary data, that can be accessed from anywhere in the world via HTTP or HTTPS. You can use Blob storage to expose data publicly to the world, or to store application data privately.

## To Run the application in Local

- Update the Key values in Web.Config appsettings section
>     <add key="<<ConnectionString_Name>>" value="BlobServerName_AuthenticationKey" />

## Overview of Blob Storage Layer

In the solution there is project name BlobStorage which is of type class library.

Inside this project there is an interface IBlob and a class called Blob which is responsible for the operations that can be done on Azure Blob.

In this we have three methods :-

- DeleteBlob
- GetBlob
- SaveBlob

Note : In the sample application we have a feature to upload and delete profile pic of the user. So in the sample application we are restricting user to upload only image file i.e (jpg, png, gif and jpeg). But blob storage can accept any type of file.
# About Swagger

Swagger is a simple and powerful representation of the REST API. With a Swagger-enabled API, we can get interactive documentation in JSON/YAML format. It is a open-source software.

## Viewing the Swagger documentation in HTML format

- Run the solution
- Application will open in browser, Navigate to https://localhost:{port}/swagger
- Now you can see the Swagger UI.

## Viewing the Swagger documentation in JSON format
- Run the solution
- Navigate to http://localhost:{port}/swagger/docs/v1

Using the swagger editor(http://editor.swagger.io/), we can generate the YAML format swagger document by import/Paste JSON option.

#### How to include annotated XML comments in Swagger documentation

To enable XML documentation, right click on Mobile API project — >”Properties” then choose “Build” tab, after you choose it scroll down to the “Output” section and check “XML documentation file” check box and set the file path to: “bin\[YourProjectName].XML”. This will add an XML file to the bin folder which contains all the XML comments you added as annotation to the controllers or data models.
By default Swashbuckle doesn’t include the annotated XML comments on the API controllers and data models into the generated specification and the UI. To include them, we need to add the below code to “SwaggerConfig.cs”.

```sh
 c.IncludeXmlComments(string.Format(@"{0}\bin\ToDoMobileApp.XML",
                           System.AppDomain.CurrentDomain.BaseDirectory));
```
Now we can start adding XML comments to API methods so for example if we take a look on the HTTP POST method in Todo Controller as the code below:
```sh
		/// <summary>
        /// Add new item to the database
        /// </summary>
        /// <param name="model"></param>
        /// <returns>HttpResponseMessage</returns>
        /// <remarks>Set the below parameter while adding the new item (Content-Type :- application/json) and (ZUMO-API-VERSION :- 2.0.0)</remarks>
        /// <response code="500">Internal Server Error</response>
        /// <response code="400">Bad Request</response>
        /// <response code="201">Created</response>
        [HttpPost]
        [Route("api/v1/Post")]
        [ResponseType(typeof(ToDoItem))]
        public HttpResponseMessage Post(ToDoItem model)
        {
		}
```
## Adding Swagger Metadata and Help UI to a Mobile App

The Microsoft.Azure.Mobile.Server.Swagger Nuget package uses Swagger and Swashbuckle to add documentation and API Explorer capability to the Mobile App:

- Swagger provides a way to document a RESTful API as well as a way to generate live Help pages for performing operations against API.

- Swashbuckle provides an easy way to add Swagger metadata and UI to a API application.

To add Helpers in the Swagger UI install Microsoft.Azure.Mobile.Server.Swagger NuGet package, open NuGet Package Manager Console and install the below package:
```sh
Install-Package Microsoft.Azure.Mobile.Server.Swagger
```
After adding the package, do the following in the SwaggerConfig class
```sh
			    // Tells the Swagger doc that any MobileAppController needs a
               // ZUMO-API-VERSION header with default 2.0.0
               c.OperationFilter<MobileAppHeaderFilter>();

               // Looks at attributes on properties to decide whether they are readOnly.
               // Right now, this only applies to the DatabaseGeneratedAttribute.
               c.SchemaFilter<MobileAppSchemaFilter>();
```


