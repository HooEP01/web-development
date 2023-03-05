//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}
));


//--------------- Setting Up Database ---------------//
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const User = mongoose.model("User", userSchema);


//--------------- Setting Up Restful API ---------------//
app.get("/", function (req, res) {
    res.render("home")
});

app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/register", function (req, res) {
    res.render("register")
});


app.post("/register", function (req, res) {
    try {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const newUser = new User({
                email: req.body.username,
                password: hash
            });
            newUser.save();
            res.render("secrets");
        });
        
    } catch (error) {
        res.status("500").send(error);
    }
});

app.post("/login", function (req, res) {
    try {
        
        (async function () {
            const login = User.findOne({
                email: req.body.username,
            })
            if (!login) {
                bcrypt.compare(req.body.password, login.password, function(err, result) {
                    if(result === true) {
                        res.render("login")
                    }
                });
            } else {
                res.render("secrets")
            }
        })()
    } catch (error) {
        res.status("500").send(error);
    }
});


app.listen(3000, function () {
    console.log("The server run on port 3000.")
});