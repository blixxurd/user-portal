const { AuthController } = require('../controllers');
const { ApiError } = require('../helpers/ErrorHandlers');
const InputValidations = require('../helpers/InputValidations');

class AppMiddleware {

	static catchNotFound(req, res, next) {
		console.log('404 Handler Initiated.');
		next(new ApiError(404, 'NOT_FOUND'));
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
			next(new ApiError(401, 'NOT_AUTHORIZED'));
		}
	}

	static validateRegistration(req, res, next) {
		req.errors = [];
		const {email, username, password} = req.body;
		const tests = InputValidations({email, username, password});
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
  
	static validatePasswordChange(req, res, next) {
		req.errors = [];
		const test = InputValidations(req.body).password;
		if(req.body.password) {
			for (let i = 0; i < test.length; i++) {
				const t = test[i];
				if(!t.test) {
					req.errors.push(t.error);
				}
			}
		} else {
			req.errors.push('Please fill out all fields to continue.');
		}
		next();
	}

}

module.exports = AppMiddleware;