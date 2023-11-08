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
    console.log(loc);
    var result =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${Api_Key}`);
    var icon=result.data.weather[0].icon.slice(0,2);
    console.log(icon);
    res.render("index.ejs",{iconData:icon});
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});