module.exports = function(app, passport) {

     var express = require('express');
     var mongoose = require('mongoose'); 

     //////////authentication models///////       
     var Reg = require("./models/register");
     var User = require("./models/user");
     //////////authentication models///////  
    
     /////////GOOGLE BOOK API//////////////////
     var books = require('google-books-search');

     ///////////profile models////////////
     var Public = require("./models/public");
     var Request = require("./models/request");
     

    //profile
    app.get('/', function(req, res) {

       var public = req.params.public;
       var names = req.params.names;
       var skase = req.params.skase;
      
       console.log(names);

       Public.find({  

      }, function(err, data) {

         if (err) { return next(err); }
          
         res.render("home", { data: data});

          }); 
       });

     //submit from profile to public    

     app.post("/sub",isLoggedIn, function(req, res, next) {
        
        var public= req.body.public;
        var write = req.body.write;
        var skase = req.user.google.name;
        var title = req.body.title;



        var p= new Public({public:public,write:write,title:title,skase:skase}); 
     
        p.save(function(err,names) {

         console.log(names);

         res.redirect('/'); 

      });        
    });

      //submit from public to each profile

        app.post("/subprof",isLoggedIn, function(req, res, next) {
        
        var public = req.body.public;
        var publics = req.body.publics;//public model
        var writes = req.body.writes;//Public model
        var skase = req.user.google.name;//req.user.google.name taken from Public model
        var title = req.body.title;        
        
        Public.find({skase:skase,title:req.params.title}, function(err, user) {

        var r = new Request({title:title,skase:req.user.google.name,publics:publics,writes:writes}); 
     
        r.save(function(err,name) {

         console.log(name);

         res.redirect('/profile/trade/'); 

      });        
     });
    });

       app.get('/profile/trade/',isLoggedIn, function(req, res) {

        var publics= req.params.publics;//public model
        var public= req.params.public;//public model
        var writes = req.params.writes;//public model
        var skase = req.params.skase;//public model
        var title = req.params.title;
        var name = req.params.name;

        console.log(name);

       Request.find({ 
      }, function(err, data) {

         if (err) { return next(err); }
          console.log(data)
         res.render("trade", { data: data});

          }); 
       });

     app.post("/",isLoggedIn, function(req, res, next) {
             
    });  

    //find books to my personal profile  

    app.get('/book',isLoggedIn, function(req, res) {
          res.render("books"); 
    });

    app.post("/book",isLoggedIn, function(req, res, next) {
        var book = req.body.book;  
        books.search(book, function(error, results) {
        if ( ! error ) {
            console.log(results)
             res.render("books2",{results:results});
        } else {
            console.log(error);
        }
    });       
});   




   ////////////////////////////////Authentication Routes////////////////////////////////////////////////////////////////////////////////////////
   app.get('/signup', function(req, res) {
        res.render('index.ejs'); 
    });
    
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user);
        res.render('profile.ejs', {
            user : req.user 
        });
    });
    // route for logging out
    app.get('/logout', function(req, res) {

        req.logout();
        res.redirect('/');
    });


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/fail'

            }));
     };   
  
// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
     }
 
/////////////////////////////////////////////////Authentication Routes////////////////////////////////////////////////////////////////