const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');

dotenv.config();

const app = express();
app.use(express.json({limit:'30mb',extended: true}));
app.use(express.urlencoded({limit:'30mb',extended: true}));

app.use('/', Auth)

app.get('/', (req,res) =>{
    res.json({message: "Çalışıyorum elleşme.."})
})


db();


app.listen();