const mongoose = require ("mongoose");
const constant = require ("./constant");

function database(){
    mongoose 
    .connect(constant.DATABASE_URI, {
        //useCreateIndex: true,
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
    })
    .then(() => {
        console.log(" yah! mongoDB is connected");
    })
    .catch((err) => {
        console.log("There was an error while connecting to the database")
    });
}

module.exports = database;