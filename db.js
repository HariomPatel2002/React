const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/mydatabase';

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

