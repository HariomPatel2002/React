const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyparser = require('body-parser');
app.use(bodyparser.json()); // req.body
const PORT = process.env.PORT || 3000;

//Middleware for Function
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocalString()} Request made to: ${req.originalurl}`);
    next();  //Move to the next phase
}

app.get('/',logRequest,(req,res)=>{
    res.send("Welcome to my Hotel")
})

const menuRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

 