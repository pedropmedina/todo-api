const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const todoSchema = new Schema({
	text: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const Todo = mongoose.model('Todo', todoSchema);

const validateTodo = todo => {
	const schema = {
		text: Joi.string()
			.min(5)
			.max(255)
			.required(),
		completed: Joi.boolean(),
	};

	return Joi.validate(todo, schema);
};

module.exports = { Todo, validateTodo };
