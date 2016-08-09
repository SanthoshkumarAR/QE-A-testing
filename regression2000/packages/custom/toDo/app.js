'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ToDo = new Module('toDo');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ToDo.register(function (app, auth, database, swagger){

    //We enable routing. By default the Package Object is passed to the routes
    ToDo.routes(app, auth, database);

// Set views path, template engine and default layout
    app.set('views', __dirname + '/server/views');
    ToDo.angularDependencies(['mean.system']);
    ToDo.aggregateAsset('css', 'toDo.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     //package.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     //package.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     //package.settings(function(err, settings) {
        //you now have the settings object
    });
     */
    swagger.add(__dirname);
    return ToDo;
});
