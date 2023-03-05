//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}
));


//--------------- Setting Up Database ---------------//
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = {
    email: String,
    password: String,
};

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
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save();
        res.render("secrets");
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
                if(login.password === req.body.password) {
                    res.render("login")
                }
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