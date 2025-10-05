const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL

//Set up MongoDb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection 
// Mongoose maintains a default conncection when we use mongoose.connect 
const db  = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB server");  
});

db.on('error',(err)=>{
    console.log("MongoDB connection error", err);
});

db.on('disconnected',()=> {
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports = db;

