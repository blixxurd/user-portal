const createError = require('http-errors');
const { AuthController } = require('../controllers');

class AppMiddleware {

	static catchNotFound(req, res, next) {
		next(createError(404));
	}

	static handleErrors(err, req, res) {
		res.locals.status = err.status || 500;
		res.status(res.locals.status);
		res.json({
			errors: [err.message || 'Unidentified Error'],
			status: res.locals.status,
			errorType: 'hard'
		});
	}

	static authorizeUser(req, res, next) {
		if(req.headers.authorization) {
			AuthController.verifyToken(req.headers.authorization).then(payload => {
				res.locals.user = payload;
				res.locals.user.token = req.headers.authorization;
				next();
			}).catch(err => {
				err.status = 401;
				next(err);
			});
		} else {
			next(createError(401));
		}
	}

	static validateRegistration(req, res, next) {
		req.errors = [];
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const usernameRegex = /^[a-zA-Z0-9_]{1,}$/;
		const {email, username, password} = req.body;
		const tests = {
			email: [
				{test: emailRegex.test(String(email).toLowerCase()), error: 'You\'ve entered an invalid email address.'}
			],
			username: [
				{test: username.length > 3 && username.length < 19, error: 'Your username must be more than 3 characters long, and no more than 18 characters long.'},
				{test: usernameRegex.test(String(username).toLowerCase()), error: 'Your username has invalid characters. It can only contain numbers, letters, and underscores.'},
			],
			password: [
				{test: password.length > 6, error: 'Your password must be at least 7 characters long.'},
			]
		};
		if(!!email && !!username && !!password) {
			for (let i = 0; i < Object.keys(tests).length; i++) {
				const test = tests[Object.keys(tests)[i]];
				for (let j = 0; j < test.length; j++) {
					const t = test[j];
					if(!t.test) {
						req.errors.push(t.error);
					}
				}
			}
		} else {
			req.errors.push('Please fill out all fields to continue.');
		}
		next();
	}

}

module.exports = AppMiddleware;