const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
	const validateAuth = auth => {
		const schema = {
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
		return Joi.validate(auth, schema);
	};

	const { error } = validateAuth(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const token = user.generateAuthToken();

	res
		.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
