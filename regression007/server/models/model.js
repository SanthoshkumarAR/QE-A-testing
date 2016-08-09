
//Database schema for the model is defined in this file

var mongoose = require("mongoose");
var  Schema = mongoose.Schema;

var dbSchema = new Schema({
    attributeName: {
        //The data type of the attribute
        type: String,
        //Define if the attribute is mandatory or not
        required: true
    }
});

//Export the schema with the name as "Model"
module.exports = mongoose.model('Model', dbSchema);
