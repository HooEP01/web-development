//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")
const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);




app.route("/articles")

    .get(function (req, res) {
        (async function () {
            const articles = await Article.find({});
            res.send(articles);
        })();
    }
    )

    .post(
        function (req, res) {
            (async function () {
                const article = new Article({
                    title: req.body.title,
                    content: req.body.content
                })
                await article.save();
            })();
        }
    )

    .delete(
        function (req, res) {
            (async function () {
                try {
                    await Article.deleteMany();
                } catch (err) {
                    console.error(err);
                    res.status(500).send("Fetch data failed.")
                }
            })();
        }
    );


app.route("/article/:articleTitle")

    .get(function (req, res) {
        (async function () {
            const foundArticle = await Article.findOne({ title: req.params.articleTitle });
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles matching that title was found.")
            }
        })()
    })

    .put(function (req, res) {
        (async function () {
            try {
                const updateArticle = await Article.updateOne(
                    { title: req.params.articleTitle },
                    { content: req.body.content }
                );
                res.send(updateArticle);
            } catch (error) {
                res.send(error);
            }
        })()
    })

    .patch(function (req, res) {
        (async function () {
            try {
                const updateArticle = await Article.update(
                    { title: req.params.articleTitle },
                    { content: req.body.content },
                );
                res.send(updateArticle);
            } catch (error) {
                res.send(error);
            }
        })()

    })

    .delete(function (req, res) {
        (async function () {
            try {
                const deleteArticle = await Article.findOneAndDelete({ title: req.params.articleTitle});
            } catch (error) {
                res.send(error);
            }
            
        })()
    });


app.listen(port, function () {
    console.log("The server is running on port " + port);
});