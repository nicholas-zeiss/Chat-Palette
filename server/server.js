/**
*     This is the server file that will serve up all of
*     our front end pages based on which endpoints are
*     being fired and will also handle any database manipulation
 */

var express = require('express');
var path = require('path');
var db = require('./db.js')

//Creates instance of express object
var app = express();

var rootpath = path.normalize(__dirname + '/..');

//this will serve up the hompage aka index
app.get('/', function(req, res) {
    console.log("Hello World");
    console.log(rootpath);
    // res.sendFile(path.join(rootpath+'/index.html'));
});

//this will be used for login page
app.get('/login', function(req, res) {
    console.log("Hello World login");
    console.log(rootpath);

});

//this will serve up the main chat page
app.get('/chat', function(req, res) {
    console.log("Hello World chat");
    console.log(rootpath);
    // alert("Hello World")

});

// app.get('/*',function(req,res){
//   console.log(req.url)
//
//   if(req.url !== '/') res.sendFile(rootpath+req.url);
// })


var port = process.env.PORT || 8080;

app.listen(port, function() {
console.log("Listening on " + port);
});
