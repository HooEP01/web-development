//jslint

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();

const items = ["prepare ingredient", "cook food", "eat food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res) {
    
    const day = date.getDate();
    res.render('list', {listTitle: day, listOfItems: items});
})

app.get("/work", function(req, res) {
    res.render('list', {listTitle: "Work List", listOfItems: workItems});
})

app.post("/", function(req, res) {
    if(req.body.title === "Work List") {
        workItems.push(req.body.newItem);
        res.redirect("/work")
    } else {
        items.push(req.body.newItem);
        res.redirect("/")
    }
})

app.listen(port, function() {
    console.log("The server is running on port 3000")
})