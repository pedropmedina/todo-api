// setup environment variables
require('../config/config.js');

// dependencies
const express = require('express');

// connect mongodb
const { mongoose } = require('../db/mongoose');

// run express
const app = express();

// global variables
const port = process.env.PORT;

// middleware
app.use(express.json());

app.use((req, res, next) => {
	res.send('hello there from express');
	next();
});

// start server
app.listen(port, () => {
	console.log(`App serverd on port ${port}`);
});
