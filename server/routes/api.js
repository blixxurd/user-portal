const express = require('express');
const router = express.Router();
const { ApiError } = require('../helpers/ErrorHandlers');
const { AuthController, UserController, VerificationController } = require('../controllers');



module.exports = ({ mid }) => {

	router.post('/register', mid.validateRegistration, (req, res, next) => {
		const user = {
			username: req.body.username, 
			password: req.body.password,
			email: req.body.email
		};
		if(req.errors.length > 0) {
			return next(new ApiError(422, req.errors));
		} else {
			UserController.create(user).then(authMember => {
				return res.json(authMember);
			}).catch(next);
		}
	});

	router.post('/login', (req, res, next) => {
		AuthController.authenticate(req.body.username, req.body.password).then(authDetail => {
			return res.json(authDetail);
		}).catch(next);
	});

	router.post('/recovery/forgot-password', (req, res) => {
		UserController.recoverPassword(req.body.email).then(recovery => {
			return res.json(recovery);
		}).catch(err => {
			//We respond normally here to avoid showing users what accounts do and don't exist.
			// TODO - 401
			console.error(err);
			return res.json({success: true}); 
		});
	});

	router.post('/recovery/reset-password', mid.validatePasswordChange, (req, res, next) => {
		if(req.errors.length > 0) {
			return next(new ApiError(422, req.errors));
		} else {
			VerificationController.updatePasswordFromVerification(req.body.token, req.body.password).then(r => {
				return res.json(r);
			}).catch(next);
		}
	});
  
	router.post('/user/update-user', [mid.authorizeUser, mid.validateUserFields], (req, res, next) => {
		if(req.errors.length > 0) {
			return next(new ApiError(422, req.errors));
		} else {
			UserController.updateUser(res.locals.user.id, req.body).then(updateResponse => {
				return res.json(updateResponse);
			}).catch(next);
		}
	});

	router.post('/user/update-profile', mid.authorizeUser, (req, res, next) => {
		UserController.updateProfile(res.locals.user.id, req.body).then(updatedProfile => {
			return res.json(updatedProfile);
		}).catch(next);
	});
  
	router.get('/user/profile', mid.authorizeUser, (req, res, next) => {
		UserController.getProfile(res.locals.user.id).then(profile => {
			const _response = {user: res.locals.user, profile: profile.responseData};
			return res.json(_response);
		}).catch(next);
	});
  
	router.get('/verification/:uuid', (req, res, next) => {
		VerificationController.getVerification(req.params.uuid).then(verification => {
			return res.json(verification);
		}).catch(next);
	});

	return router;

};