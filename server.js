const express = require('express');
const app = express();
const db = require('./db');

const bodyparser = require('body-parser');

app.use(bodyparser.json()); // req.body

app.get('/',(req,res)=>{
    res.send("Welcome to my Hotel")
})

const menuRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

 