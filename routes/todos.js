const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const _ = require('lodash');
const { Todo, validateTodo } = require('../models/todo');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
	const todos = await Todo.find({ creator: req.user._id });
	res.send(todos);
});

router.get('/:id', auth, async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid ID');
	}

	const todo = await Todo.findOne({
		_id: req.params.id,
		creator: req.user._id,
	});
	if (!todo) return res.status(404).send('No todo found with given ID.');

	res.send(todo);
});

router.post('/', auth, async (req, res) => {
	const { error } = validateTodo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let todo = _.pick(req.body, ['text', 'completed']);
	todo.creator = req.user._id;
	todo = new Todo(todo);

	await todo.save();

	res.send(todo);
});

router.put('/:id', auth, async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid ID');
	}

	const { error } = validateTodo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const todo = await Todo.findOneAndUpdate(
		{ _id: req.params.id, creator: req.user._id },
		_.pick(req.body, ['text', 'completed']),
		{ new: true },
	);

	res.send(todo);
});

router.delete('/:id', auth, async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid Id');
	}

	const todo = await Todo.findOneAndRemove({
		_id: req.params.id,
		creator: req.user._id,
	});
	if (!todo) return res.status(404).send('No todo found with given ID.');

	res.send(todo);
});

module.exports = router;
