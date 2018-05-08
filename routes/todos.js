const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const _ = require('lodash');
const { Todo, validateTodo } = require('../models/todo');

router.get('/', async (req, res) => {
	const todos = await Todo.find();
	res.send(todos);
});

router.get('/:id', async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid ID');
	}

	const todo = await Todo.findById(req.params.id);
	if (!todo) return res.status(404).send('No todo found with given ID.');

	res.send(todo);
});

router.post('/', async (req, res) => {
	const { error } = validateTodo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let todo = new Todo(_.pick(req.body, ['text', 'completed']));

	await todo.save();

	res.send(todo);
});

router.put('/:id', async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid ID');
	}

	const { error } = validateTodo(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const todo = await Todo.findByIdAndUpdate(
		req.params.id,
		_.pick(req.body, ['text', 'completed']),
		{ new: true },
	);

	res.send(todo);
});

router.delete('/:id', async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Invalid Id');
	}

	const todo = await Todo.findByIdAndRemove(req.params.id);
	if (!todo) return res.status(404).send('No todo found with given ID.');

	res.send(todo);
});

module.exports = router;
