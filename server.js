var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initializes passport and tells express we wnat to use it as middleware (aka app=express)
app.use(passport.initialize());

//GET routes
app.get('/success', function (req, res) {
    res.send("Hey, hello from the server!");
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});


app.listen(8000, function () {
    console.log("Ready for some authentication action");
})