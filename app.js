const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , (req,res) => {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "e708b66fbef1bb20c0472452a7884b77";
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&appid=" + apiKey + "&units=" + unit;
    https.get(url,(response) => {
       console.log(response.statusCode);

       response.on("data" , (data) => {
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const discription =  weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       res.write("<p>The weather is currently " + discription + "</p>");
       res.write("<h1>The temperature in " + query + "is " + temp + "degrees.");
       res.write("<img src="+imageURL+">");
       res.send();
       });
    });
});


app.listen(3000 ,() => {
  console.log("Server is running at port 3000");
});

// e708b66fbef1bb20c0472452a7884b77








