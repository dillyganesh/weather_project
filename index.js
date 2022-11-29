const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
   //res.sendFile(__dirname + "/login.html");

    console.log("request from browser :" + req.originalUrl);
})

//signup page
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/signUp.html");
})


app.post("/weather", function (req, res) {
    console.log("posted");

    const cityname = String(req.body.n1);
    console.log(cityname);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=1f6db9f12ccd227cc67f416741071835";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            //console.log(data);  //  we getting output as hexa decimal format any format doesn't we can convert into api response format to js object
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const city = weatherData.name;
            const tempe = weatherData.main.temp;


            res.send("<h1>" + city + " Temperature is : " + tempe + "</h1>");

        })
    })
})
app.get("/about", function (req, res) {
    res.send("<h3>Contact me at : dillymaxwell@gmail.com</h3>");
})



app.post("/", function (req, res) {
    // console.log("over all request is :"+req);
    //console.log( res );
    var a = Number(req.body.n1);
    var b = Number(req.body.n2);
    var c = a + b;
    // res.send("<h1>hello </h1> "+ req.body.fname  );
    res.send("<h5>Total is : " + c + "</h5> ");

})
app.listen(3000, function () {
    console.log(" server started on port 3000");
});