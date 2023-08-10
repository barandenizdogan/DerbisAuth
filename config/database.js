const mongoose = require('mongoose');


const db = () => {

    mongoose.connect("mongodb+srv://barandenizdogan:159630Bb@dksauth.aytbsoc.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(() => {
        console.log("MongoDB connected")
    }).catch((err) => {
        console.log(err)
    })

}

module.exports = db;