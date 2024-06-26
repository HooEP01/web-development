//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();




app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}
));





app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




//--------------- Setting Up Database ---------------//
mongoose.connect("mongodb://127.0.0.1:27017/userDB");


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
// hash and salt password
userSchema.plugin(passportLocalMongoose);



const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    state: true
},
    function (accessToken, refreshToken, profile, cb) {
        async function findOrCreate() {
            const find = await User.findOne({ googleId: profile.id });

            if (!find) {
                const create = new User({
                    email: profile.id,
                    password: profile.id
                })
                const newUser = await create.save();

                if (newUser) {
                    return cb(null, newUser);
                }

            } else {
                return cb(null, find);
            }
        }
        findOrCreate();
    }
));



//--------------- Setting Up Restful API ---------------//
app.get("/", function (req, res) {
    res.render("home")
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/secrets');
    });


app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/register", function (req, res) {
    res.render("register")
});

app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/register",
    passport.authenticate('local', { failureRedirect: '/register', failureMessage: true }),
    function (req, res) {
        // register() from passport

        async function register() {
            const user = new User({
                email: req.body.username,
                password: req.body.password
            });

            const newUser = await user.save();
            res.redirect("/secrets");
        }
        register();
    });

app.post("/login",
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        try {
            (async function () {
                const login = await User.findOne({
                    email: req.body.username,
                })
                if (!login) {
                    res.render("login")
                }
                else {
                    if (login.password === req.body.password) {

                        res.redirect("/secrets");

                    }
                }
            })()
        } catch (error) {
            res.status("500").send(error);
        }

    });


app.listen(3000, function () {
    console.log("The server run on port 3000.")
});