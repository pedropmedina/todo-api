require('../config/config.js');

const express = require('express');

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
	res.send('hello there from express');
	next();
});

app.listen(port, () => {
	console.log(`App serverd on port ${port}`);
});
