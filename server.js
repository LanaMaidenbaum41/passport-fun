var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false
}));
//initializes passport and tells express we wnat to use it as middleware (aka app=express)
app.use(passport.initialize());

//this makes sure that our app is using passport.session middleware - ability to use express sessions
app.use(passport.session());

//serializing user data allows for express sessions - bakes a cookie
passport.serializeUser(function (user, done) {
    console.log("serialize user: "+ user)
    done(null, user.username);
});
passport.deserializeUser(function (user, done) {
    console.log("deserialize user: "+user)
    done(null, user);
});

passport.use(new LocalStrategy(function (username, password, done) {
    if ((username === "john") && (password === "password")) {
        return done(null, { username: username, id: 1 });
    } else {
        return done(null, false);
    }
}));

//GET routes
app.get('/success', function (req, res) {
    if(req.isAuthenticated()) {
        res.send("Hey, " + req.user + " hello from the server!");
    }
    else {
        res.redirect('/login');
        console.log('no cookies :(')
    }
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
}));

app.listen(8000, function () {
    console.log("Ready for some authentication action");
});