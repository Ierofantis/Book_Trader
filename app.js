var express = require('express');
var app = express();
require('dotenv').load();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var routes = require('./routes');
var session = require("express-session");
var flash    = require('connect-flash');
var morgan = require('morgan');



mongoose.connect("mongodb://", function (error){
   
   if (error) console.error(error);
   else console.log("mongo connected")

});

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ secret: 'hi' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// routes 
require('./routes.js')(app, passport);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
