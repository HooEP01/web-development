//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const e = require("express");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")

const itemsSchema = {
  name: String,
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  const day = date.getDate();
  (async function () { 
    const a = await Item.find();
    if(a.length === 0) {
      const b = await Item.insertMany(defaultItems);
      res.render("list", {listTitle: day, newListItems: b});
    } else {
      res.render("list", {listTitle: day, newListItems: a});
    }
    
  })()
});


app.get("/:customListName", function(req,res){
  
  (async function(){
    const customListName = _.capitalize(req.params.customListName);
    const foundList = await List.findOne({name: customListName});
    if(!foundList){
      const list = new List({
        name: customListName,
        items: defaultItems, 
      })
      const save = await list.save();
      if(save){
        res.redirect("/" + customListName);
      }
    } else {
      res.render("list", {listTitle: customListName, newListItems: foundList.items});
    }
  })()
  
});


app.post("/", function(req, res){
  const day = date.getDate();
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  })

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    (async function(){
      const foundItem = await List.findOne({name: listName});
      foundItem.items.push(item);
      foundItem.save();
    })()
    res.redirect("/" + listName);
  }
});

app.post("/delete", function(req, res){
  const day = date.getDate();
  const itemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === day) {
    (async function(){
      const a = await Item.findByIdAndDelete(itemId);
      console.log(a)
    })()
    res.redirect("/")
  }else{
    (async function(){
      const removeItem = await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}});
    })()
    res.redirect("/" + listName)
  }
});





app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
