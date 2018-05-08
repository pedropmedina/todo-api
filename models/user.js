const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 50,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		trim: true,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id, isAdmin: user.isAdmin },
		process.env.JWT_SECRET,
	);
	return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = user => {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		email: Joi.string()
			.min(5)
			.max(50)
			.trim()
			.email()
			.required(),
		password: Joi.string()
			.min(5)
			.trim()
			.required(),
	};

	return Joi.validate(user, schema);
};

module.exports = { User, validateUser };
