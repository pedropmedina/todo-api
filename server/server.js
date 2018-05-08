// setup environment variables
require('../config/config.js');

// dependencies
const express = require('express');

// connect mongodb
const { mongoose } = require('../db/mongoose');

// run express
const app = express();

// require routes
const todos = require('../routes/todos');

// global variables
const port = process.env.PORT;

// middleware
app.use(express.json());

// routes
app.use('/api/v1/todos', todos);

// start server
app.listen(port, () => {
	console.log(`App serverd on port ${port}`);
});
