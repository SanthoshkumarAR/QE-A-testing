# About the Framework – ASP.NET MVC Mobile

The ASP.NET MVC framework is a template provided by Microsoft, which implements the model–view–controller (MVC) pattern and exposes an API.

## About the App

 The "ToDo" Web app is created using ASP.NET MVC Mobile framework in order to showcase a App that will do CRUD operations using a database and to demonstrate other Mobile app functionalities.
 
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
  	- Models
  - Notifications
  	- Controller
  	- Models
  - BusinessLogic
  	- Service Location
  - App
  	- Controllers
  	- Util
  	- App_Start
  	
		
### Data Access Layer 

This is data access layer, which will interact with the database. Connection Strings should be configured in Web.Config. Database context will be created using this connection strings and database call will be invoked.

### Domain layer

This layer contains the domain model which is used in the application. In this we have used DataAnnotations for validing user input.

### Business Logic layer

This layer is responsible for implementing business logic and conversion to / from DAL and Domain models. In this we have used auto mapper to do mapping between Domain and DAL models.

### App Layer

This is a Mobile application using MVC 5 architecture.

Below are the features implemented in the application. 

#### Logging

For this there is an adapter called Logger which is inside Util folder in the application. 
To enable logging in Azure, login to https://portal.azure.com and navigate to your web app. Then click on “All Settings” -> then click on “Diagnostics logs” inside Features. Then based on your requirement you can either choose Filesystem or Blob. You can also select the level of logging you want. After configuring the logging click “Save” on top of the panel. 

#### Validation

##### Server side validation

For server side validation you need to use the below, this will return a bool based on model passed :-
```sh
if (ModelState.IsValid){}
```

#### Exception handling

All the unhandled exceptions would be caught in the controller and logged.

#### Dependency injection 

This is to inject the dependency. For this there is an adapter name "UnityConfig" in App_Start folder. You need to register you type inside RegisterTypes function.
```sh
 container.RegisterType<IProductRepository, ProductRepository>();
```

## Unit test case execution:

 The test cases for the operations are present in the '<'ApplicationProjectName> tests Project. These test cases are executed using Visual Studio.
 To run the test cases goto "Test" menu and select "Run" sub-menu then select the options like All Tests/Passed Tests/Failed Tests/Not Run Tests
 
## Code coverage:

We can check the code coverage for each of the file using Visual studio. To check the code coverage goto "Test" menu and select "Analyze Code Coverage" then select the options like Selected Tests/All Tests
 
## Code analysis:

- Code Analysis is important to deliver perfect product
- Code Analysis can be set by following below steps
- "Right Click" on Solution Explorer --> Properties --> Common Properties --> Code Analysis Settings --> 
 	"Select Each Project" --> "Microsoft Managed Recommended Rules"
  
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
## ToDo Mobile Application Using Knockout

The objective of this application is to test the Mobile App API using Knockout JS client application.

## Knockout related file

- Index.html
- todo.js

### Index.html

This is the view which will render the html in browser by default when the application start. The default routing in defined in RouteConfig.cs file which is inside App_Start. So from there it will call the Index method inside ToDoController controller which will render the Index View. 

### todo.js

Based on the even trigger in the Index.cshtml it will call the respective method in the todo.js file. After that it will do validation and call a method of MVC controller through ajax. Based on response received from the controller it will load the view accordingly.

var baseURL = "http://redisknockout.azurewebsites.net";

    $.ajax({
        type: "GET",
        url: baseURL + "/api/Todo",
        headers: { "ZUMO-API-VERSION": "2.0.0", "Content-Type": "application/json" },
        async: false
    }).done(function (result) {
        ko.applyBindings(new ToDoViewModel(result));
    }).fail(function (err) {
    });

# About Azure DocumentDB

Azure DocumentDB is a fully managed NoSQL database service built for fast and predictable performance, high availability, automatic scaling, and ease of development. Its flexible data model, consistent low latencies, and rich query capabilities make it a great fit for web, mobile, gaming, and IoT, and many other applications that need seamless scale.

## To Run the application in Local machine

- Update the Server Key values in Web.Config AppSettings section

>     <add key="endpoint" value="<<EndPoint_Name>>"/>
>     <add key="authKey" value="<<Aunthentication_Key>>/>
>     <add key="database" value="<<DB_Name>>"/>
>     <add key="collection" value="<<Collection_Name>>"/>

## How DocumentDB is used in this ToDo App?

In this ToDo app, the functionalities are seperated by layers. And DAL is responsible for making the communication with DocumentDB. 

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

## List of functionlaities implented for ToDoItem Object
	
	Connection should be established to make a communication between client and DocumentDB. The below code will establish the connection object.

			new DocumentClient(new Uri(<<Document DB EndPoint>>), <<Primary/Secondary Key of the DocumentDB>>);

	- Create
	- GetAll
	- GetByID
	- Update
	- Delete

### Create Method
	
	This method is responsible for creating/inserting a generic object/document into specified DocumentDB.

	client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(<<Your_DatabaseName>>, <<Your_CollectionName>>), <<Your Object>>)

	The above method returns a document which was inserted.

### GetAll Method
	
	This method is responsible for fetching the documents from the mentioned collection as a list.

	client.CreateDocumentQuery<TObject>(UriFactory.CreateDocumentCollectionUri(<<Your_DatabaseName>>, <<Your_CollectionName>>)).AsDocumentQuery();

### GetByID Method
	
	This method is responsible for fetching the documents based upon the search criteria.

	client.ReadDocumentAsync(UriFactory.CreateDocumentUri(<<Your_DatabaseName>>, <<Your_CollectionName>>, <<Search_ID>>));

### Update Method
	
	This method is responsible for updating the document.

	client.ReplaceDocumentAsync(UriFactory.CreateDocumentCollectionUri(<<Your_DatabaseName>>, <<Your_CollectionName>>), <<Object_To_Be_Replaced>>, null);

### Delete Method
	
	This method is responsible for deleting the document.

	client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(<<Your_DatabaseName>>, <<Your_CollectionName>>, <<ID_To_Be_Deleted));

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


