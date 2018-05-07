const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(console.log('MongoDB is connected'))
	.catch(err => console.log('Error connecting to MongoDB: ', err));

module.exports = { mongoose };
