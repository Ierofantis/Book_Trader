var mongoose = require("mongoose");

var regSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String  },
  createdAt: { type: Date, default: Date.now }
});

regSchema.methods.title = function() {
  return this.titles;
};

var Reg = mongoose.model("Reg", regSchema);

module.exports = Reg;