const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema ({
  name: { 
    type: String, 
    required: true 
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

// pluralise "Fruit" inside model into fruits (collection)
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
})

// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: Object,
})

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
})

// person.save();



const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me."
});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird Texture."
});

// Fruit.insertMany([kiwi, orange, banana]);

const pineapple = new Fruit({
  name: "pineapple",
  score: 9,
  review: "Great fruit!"
})

// pineapple.save();

const person2 = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple,
})

// person2.save();

// async function main() {
//   await Fruit.deleteOne({ _id: '64016380dafee188fb1a7e65' });
//   const findAllFruit = await Fruit.find();

//   // findAllFruit.forEach(function(fruit){
//   //   console.log(fruit.name)
//   // });

//   // const updateOneFruit = await Fruit.updateOne({_id: "64016380dafee188fb1a7e66"}, {name: "bananana"});
//   console.log(findAllFruit)

  

//   mongoose.connection.close();
// }
// main();





async function embeddedDocument() {
  const kiwi = await Fruit.findOne({name: "Kiwi"});
  const john = await Person.updateOne({name: "John"}, {favoriteFruit: kiwi});
  console.log(john);
  mongoose.connection.close();
}

embeddedDocument();



// const { MongoClient } = require("mongodb");
// const uri = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(uri);


// async function run() {

//   try {

//     const database = client.db("fruitDB");

//     const fruits = database.collection("fruit");

//     // create an array of documents to insert

//     const docs = [

//       { name: "banana", healthy: true },

//       { name: "watermelon", healthy: true },

//       { name: "durian", healthy: true }

//     ];

//     // this option prevents additional documents from being inserted if one fails

//     const options = { ordered: true };

//     const result = await fruits.insertMany(docs, options);

//     console.log(`${result.insertedCount} documents were inserted`);

//   } finally {

//     await client.close();

//   }

// }

// run().catch(console.dir);