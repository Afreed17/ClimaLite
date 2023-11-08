import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

// code 

const app = express();
const port = 3000;
const Api_Key='24ac61e2a7cad920904fa9d632d60657';


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});



app.post("/forecast",async(req,res)=>
{
    const loc=req.body.city;
    var result =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${Api_Key}`);
    var icon=result.data.weather[0].icon.slice(0,2);
    var description=result.data.weather[0].description;
    var celcius=(result.data.main.temp-273).toFixed(2);
    var minTemp=(result.data.main.temp_min-273).toFixed(2);
    var maxTemp=(result.data.main.temp_max-273).toFixed(2);
    var feelsLike=(result.data.main.feels_like-273).toFixed(2);
    var humidity=result.data.main.humidity;
    var pressure=result.data.main.pressure;
    var windSpeed=result.data.wind.speed;
    console.log(windSpeed)
    res.render("index.ejs",
    {
        iconData:icon,
        descriptionData:description,
        celciusData:celcius,
        minTempData:minTemp,
        maxTempData:maxTemp,
        feelsLikeData:feelsLike,
        humidityData:humidity,
        pressureData:pressure,
        windSpeedData:windSpeed,
    });
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});