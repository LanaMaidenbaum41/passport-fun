var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initializes passport and tells express we wnat to use it as middleware (aka app=express)
app.use(passport.initialize());

passport.use(new LocalStrategy(function(username, password, done) {
    if ((username === "john") && (password === "password")) {
      return done(null, { username: username, id: 1 });
    } else {
      return done(null, false);
    }
  }));

//GET routes
app.get('/success', function (req, res) {
    res.send("Hey, hello from the server!");
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    session: false
}));

app.listen(8000, function () {
    console.log("Ready for some authentication action");
})