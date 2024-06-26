const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/d910ac346e";
    
    const options = {
        method: "POST",
        auth: "angela1:334430d5f33d6348e3512c72f57bd61a-us10",
    }
    
    const request = https.request(url, options, function(response) {
        
        

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();

})


app.listen('3000', () => {
    console.log("server is running on port 3000");
})

//d910ac346e
//334430d5f33d6348e3512c72f57bd61a-us10