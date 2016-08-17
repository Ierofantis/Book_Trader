var mongoose = require("mongoose");

var publicSchema = mongoose.Schema({

 public: { type: String },
 write: { type: String },
 skase: {type:String},
 writes: { type: String },
 publics: {type:String},
 title: { type: String }

});


var Public = mongoose.model("Public", publicSchema);

module.exports = Public;