const express = require('express');
const router = express.Router();
const { AuthController, UserController } = require('../controllers');



module.exports = ({ mid }) => {

	router.post('/register', mid.validateRegistration, (req, res, next) => {
		const user = {
			username: req.body.username, 
			password: req.body.password,
			email: req.body.email
		};
		if(req.errors.length > 0) {
			return res.json({errors: req.errors, errorType: 'soft', status: 200});
		} else {
			UserController.create(user).then(authMember => {
				return res.json(authMember);
			}).catch(e => {
				if(!!e.code && e.code == 11000) {
					// Duplicate
					const dupeKey = Object.keys(e.keyPattern)[0];
					return res.json({errors: [`That ${dupeKey} is already taken. Please choose another.`], errorType: 'soft', status: 200, context: e.name+e.code});
				} else {
					return next(e);
				}
			});
		}
	});

	router.post('/login', (req, res, next) => {
		AuthController.authenticate(req.body.username, req.body.password).then(authDetail => {
			return res.json(authDetail);
		}).catch(next);
	});

	router.post('/activate', (req, res) => {
		// Activates account
		return res.json({activation: 'activation'});
	});

	router.post('/forgot-password', (req, res) => {
		// Triggers password reset
		return res.json({activation: 'activation'});
	});

	router.post('/reset-password', (req, res) => {
		// Triggers password reset
		return res.json({activation: 'activation'});
	});

	router.post('/update-profile', mid.authorizeUser, (req, res) => {
		// Updates profile
		return res.json({activation: 'activation'});
	});


	router.get('/user', mid.authorizeUser, (req, res, next) => {
		UserController.getUser(res.locals.user.id).then(user => {
			return res.json(user);
		}).catch(next);
	});

	return router;

};