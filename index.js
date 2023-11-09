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
    try
    {
        var loc=req.body.city;
        var result =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${Api_Key}`);
        var description=result.data.weather[0].description;
        var celcius=(result.data.main.temp-273).toFixed(2);
        var minTemp=(result.data.main.temp_min-273).toFixed(2);
        var maxTemp=(result.data.main.temp_max-273).toFixed(2);
        var feelsLike=(result.data.main.feels_like-273).toFixed(2);
        var humidity=result.data.main.humidity;
        var pressure=result.data.main.pressure;
        var windSpeed=result.data.wind.speed;
        var icon=result.data.weather[0].icon.slice(0,2);
    }
    catch (error) {
        res.render("index.ejs",{content:"oops! Location is not valid",content2:"Please Enter the correct location name.!"});
      }

    var iconURLdata=""

    switch(icon)
    {
        case "01":
            iconURLdata="../images/clear-sky.png";
            break;
        case "02":
            iconURLdata="../images/few-clouds.png";
            break;
        case "03":
            iconURLdata="../images/scattered-clouds.png";
            break;
        case "04":
            iconURLdata="../images/broken-clouds.png";
            break;
        case "09":
            iconURLdata="../images/shower-rain.png";
            break;
        case "10":
            iconURLdata="../images/rain.png";
            break;
        case "11":
            iconURLdata="../images/storm.png";
            break;
        case "13":
            iconURLdata="../images/snow.png";
            break;
        case "50":
            iconURLdata="../images/mist.png";
            break;
        default:
            iconURLdata="../images/sorry";
    }



    const date=new Date();
    let month=date.getMonth()+1;
    let day=date.getDate();//1-31
    let weekday=date.getDay();

    var bmonth="";
    switch(month){
        case 1: 
        bmonth = "January";
        break;
        case 2: 
        bmonth = "February";
            break;
        case 3: 
        bmonth = "March";
            break;
        case 4: 
        bmonth = "April";
            break;
        case 5: 
        bmonth = "May";
            break;
        case 6: 
        bmonth = "June"; 
            break;
        case 7: 
        bmonth = "July";
            break;
        case 8: 
        bmonth = "August";
            break;
        case 9: 
        bmonth = "September";
            break;
        case 10: 
        bmonth = "October";
            break;
        case 11: 
        bmonth = "November";
            break;
        case 12: 
        bmonth = "December";
            break;
        default:
        bmonth="invalid Month";
        } 

    var bweekday="";
    switch(weekday)
    {
        case 0:
            bweekday="Sunday";
            break;
        case 1:
            bweekday="Monday";
            break;
        case 2:
            bweekday="Tuesday";
            break;
        case 3:
            bweekday="Wednesday"
            break;
        case 4:
            bweekday="Thursday"
            break;
        case 5:
            bweekday="Friday"
            break;
        case 6:
            bweekday="Saturday"
            break;
        default:
            bweekday="invalid Weekday";
    }

    var currentDate=`${bweekday},${day} ${bmonth}`;

    res.render("index.ejs",
    {
        locationData:loc,
        currentDateData:currentDate,
        iconData:iconURLdata,
        descriptionData:description,
        celciusData:celcius,
        minTempData:minTemp,
        maxTempData:maxTemp,
        feelsLikeData:feelsLike,
        humidityData:humidity,
        pressureData:pressure,
        windSpeedData:windSpeed
    });
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});