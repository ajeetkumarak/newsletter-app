const express = require('express');
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html")
   
})

app.post("/", function(req, res) {

    // console.log(req.body.cityName)

    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "c3c9b0907657e5366c310729629610d0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=` + query + `&units=` + unit + `&appid=` + apiKey;
     
    https.get(url, function(response) {
        // console.log(response)
        console.log(response.statusCode)

        response.on("data", function(data) {
            // console.log(data)
            const weatherData = JSON.parse(data)
            // console.log(weatherData)

            const locationName = weatherData.name + "," + weatherData.sys.country
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            console.log(temp + " degrees")
            console.log("pressure :" + weatherData.main.pressure)
            

            res.write(`<h1>The temperature in `+ locationName +` is `  + temp +` degrees celcius today.</h1>`)
            res.write(`<p>The weather is currently ` + weatherDescription +`.</p>`)
            res.write(`<h2>Thanks..</h2>`)
            res.write("<img src="+ imageURL + " alt="+ weatherDescription + " >")

            res.send()


            // const object = {
            //     name : "Ajeet",
            //     food : "Ramen"
            // }
            // console.log(JSON.stringify(object))
        })

    console.log("Post Request Received.");
    })
})
 
 // const query = "delhi";
    // const unit = "metric";
    // const apiKey = "c3c9b0907657e5366c310729629610d0";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=` + query + `&units=` + unit + `&appid=` + apiKey;
     
    // https.get(url, function(response) {
    //     // console.log(response)
    //     console.log(response.statusCode)

    //     response.on("data", function(data) {
    //         // console.log(data)
    //         const weatherData = JSON.parse(data)
    //         // console.log(weatherData)

    //         // const object = {
    //         //     name : "Ajeet",
    //         //     food : "Ramen"
    //         // }
    //         // console.log(JSON.stringify(object))
 
    //         const locationName = weatherData.name
    //         const icon = weatherData.weather[0].icon
    //         const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
    //         const temp = weatherData.main.temp
    //         const weatherDescription = weatherData.weather[0].description
    //         console.log(temp + " degrees")
    //         console.log("pressure :" + weatherData.main.pressure)
            

    //         res.write(`<h1>The temperature in `+ locationName +` is `  + temp +` degrees celcius today.</h1>`)
    //         res.write(`<p>The weather is currently ` + weatherDescription +`.</p>`)
    //         res.write(`<h2>Thanks..</h2>`)
    //         res.write("<img src="+ imageURL + " alt="+ weatherDescription +">")

    //         res.send()
    //     })

    // })

app.listen(port , function() {
    console.log(`Server is running on port ${port}`)
}) 