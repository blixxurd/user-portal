const { AuthController } = require('../controllers');
const { ApiError } = require('../helpers/ErrorHandlers');

class AppMiddleware {

	static catchNotFound(req, res, next) {
		console.log('404 Handler Initiated.');
		next(new ApiError(404, 'Not Found'));
	}

	// eslint-disable-next-line no-unused-vars
	static handleErrors(err, req, res, next) {
		console.log('Error Response Initiated.');
		// If it's not already an API error, we should make it one. 
		if(err.name !== 'ApiError') {
			err = new ApiError(err.status || 500, err.message, err);
		}
		return res.status(err.status).json({
			errors: err.messages,
			state: err.name
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
			next(new ApiError(401, 'No authorization token provided.'));
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