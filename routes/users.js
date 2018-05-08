const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

router.post('/', async (req, res) => {
	// check req.body to ensure that it complies with the schema
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if the email is already in used
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered');

	// create new user selecting only the required props
	user = new User(_.pick(req.body, ['name', 'email', 'password']));

	// hash the password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	// save the user to the db
	await user.save();

	// generate a token with
	const token = user.generateAuthToken();

	// in the response we set the header and send props to client
	res
		.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
