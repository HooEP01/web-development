const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "ce1dff25e421296341a781777551ef25";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;
    
    https.get(url, (response) => {
        console.log(response.statusCode)
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<head><meta charset="utf-8"></head>');
            res.write("The weather is currently " + description);
            res.write("<h2> The temperature in " + query + " is " + temp + "</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        
        })
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})