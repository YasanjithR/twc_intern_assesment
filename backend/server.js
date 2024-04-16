const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;



app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRoutes)
app.use('/contact',contactRoutes)


const URL = process.env.MONGO_URI;

mongoose.connect(URL);


const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongodb Connnection success!");
});



const server = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`)
});

module.exports=server
