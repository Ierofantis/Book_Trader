var mongoose = require("mongoose");

var reqSchema = mongoose.Schema({


 publics: { type: String },
 writes: { type: String },
 title: { type: String },
 gnames: {type:String},
 skase: {type:String}


});


var Request= mongoose.model("Request", reqSchema);

module.exports = Request;