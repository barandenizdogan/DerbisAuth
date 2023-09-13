const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');

dotenv.config();

const app = express();
app.use(express.json({limit:'30mb',extended: true}));
app.use(express.urlencoded({limit:'30mb',extended: true}));

app.use('/', Auth)

app.get('/easteregg', (req,res) =>{
    res.json({message: "Özkanın amk"})
})


db();


app.listen(
    3000
);