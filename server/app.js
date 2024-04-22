const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 

const routes = require("./router/route");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
	// origin: 'https://holidayescape.netlify.app',
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/api',routes);

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
	.connect("mongodb://127.0.0.1:27017/htd")
	.then(() => app.listen(8000 , ()=>{console.log("server started on 8000")}))
	.catch((err) => console.log(err.message));

// app.listen(8000 , ()=>{console.log("Server started on port 8000")});