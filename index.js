import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

// code 

const app = express();
const port = 3000;


app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});