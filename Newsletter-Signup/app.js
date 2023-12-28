const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// console.log(request)

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const apiKey = "3160efa1a633825756fb4820b438c365-us13";
  const dc = "us13";
  const url = "https://" + dc + ".api.mailchimp.com/3.0/lists/bc9ebea2d8";

  const options = {
    method: "POST",
    auth: "ajeetapi:3160efa1a633825756fb4820b438c365-us13",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
      // res.send(`<h2>Successfully Subscribed to Newsletter</h2>` + `<h3>Thanks for Subscribing . . .</h3>`)
    } else {
      res.sendFile(__dirname + "/failure.html");
      // res.send(`<h2>There was an error with signing up. Please try again . . .</h2>`)
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  app.post("/failure", function (req, res) {
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is running on 3000`);
});

// API Key
// 3160efa1a633825756fb4820b438c365-us13

// List Id
// bc9ebea2d8
