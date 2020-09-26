const NotificationController = require('../controllers/NotificationController');
const Notify = new NotificationController();
const { Verification, User } = require('../db');
const { ApiError } = require('../helpers/ErrorHandlers');
const { validate } = require('uuid');

class VerificationController {

	static getVerification(verification_id) {
		return new Promise((resolve, reject) => {
			const _valid = validate(verification_id);
			if(!_valid) {
				return reject(new ApiError(422, 'Invalid verification ID'));
			}
			Verification.findOne({verification_id}).then(v => {
				console.log(v);
				return resolve(v.publicResponse);
			}).catch(e => {
				return reject(new ApiError(422, 'Invalid verification ID', e));
			});
		});
	}
  
	/**
   * Adds a verticication entry and notifies a user by email when a new account is made. 
   * @param {Object} user User model for the user being notified
   */
	static sendAccountVerification(user) {
		console.log(`Sending verification email to ${user.email}`);
		const _verification = new Verification({ user_id: user._id, verification_type: 'new-account' });
		_verification.save().then(verificationResult => {
			Notify.sendActivationEmail(user, verificationResult.verification_id);
		}).catch(e => {
			console.error(e);
		});
	}
  
	/**
   * Sends an email change verification to a user
   * @param {Object} user User model for the user being notified
   */
	static sendEmailVerification(user, newEmail) {
		console.log(`Sending verification email to ${newEmail}`);
		const _verification = new Verification({ 
			user_id: user._id, 
			verification_type: 'email-change',
			expires: new Date(new Date().getTime() + 60 * 60 * 2 * 1000),
			meta: { newEmail, oldEmail: user.email }
		});
		_verification.save().then(verificationResult => {
			Notify.sendEmailChange(newEmail, verificationResult.verification_id);
		}).catch(e => {
			console.error(e);
		});
	}
  
	/**
   * Sends an email change verification to a user
   * @param {Object} user User model for the user being notified
   */
	static sendPasswordReset(user) {
		return new Promise((resolve, reject) => {
			console.log(`Sending password reset email to ${user.email}`);
			if(user.verified) {
				const _verification = new Verification({ 
					user_id: user._id, 
					verification_type: 'password-recovery',
					expires: new Date(new Date().getTime() + 60 * 60 * 1 * 1000)
				});
				_verification.save().then(verificationResult => {
					Notify.sendPasswordReset(user, verificationResult.verification_id);
					return resolve({success: true});
				}).catch(e => {
					return reject(new ApiError(500, 'MONGO_FAIL', e));
				});
			} else {
				return reject(new ApiError(422, 'ACCOUNT_VERIFICATION_REQUIRED'));
			}
		});
	}
  
	/**
   * Handles the verification of a user account
   * @param {*} v The verification object
   */
	static verifyAccount(v) {
		return new Promise((resolve, reject) => {
			// Get user and flag them as activated, then delete the verification
			User.findOne(v.user_id).then(async u => {
				if(!u.verified) {
					try {
						u.verified = true;
						v.handled = true;
						await u.save();
						await v.save();
						return resolve(u.responseData);
					} catch(e) {
						return reject(e);
					}
				} else {
					return reject(new ApiError(422, 'ALREADY_VERIFIED'));
				}
			}).catch(reject);
		});
	}
  
	/**
   * Handles password change from verification.
   * @param {*} verification_id 
   * @param {*} newPassword 
   */
	static updatePasswordFromVerification(verification_id, newPassword) {
		return new Promise((resolve, reject) => {
			if(verification_id && newPassword) {
				Verification.findOne({verification_id}).then(v => {
					User.findOne({_id: v.user_id}).then(async user => {
						user.password = newPassword;
						v.handled = true;
						try {
							await user.save();
							await v.save();
							return resolve(user.responseData);
						} catch(e) {
							return reject(e);
						}
					});
				}).catch(reject);
			} else {
				return reject(new ApiError(422, 'PASSWORD_CHANGE_MISSING_FIELDS'));
			}
		});
	}
  
	/**
   * Handles the verification of a user account
   * @param {*} v The verification object
   */
	static verifyEmail(v) {
		return new Promise((resolve, reject) => {
			// Get user and flag them as activated, then delete the verification
			User.findOne(v.user_id).then(async u => {
				console.log(`Attempting email change for user: ${v.user_id}`);
				console.log(v);
				if(v.hasEmailMeta && u.email == v.meta.oldEmail) {
					v.handled = true;
					try {
						u.email = v.meta.newEmail;
						await u.save();
						await v.save();
						return resolve(u.responseData);
					} catch(e) {
						return reject(e);
					}
				} else {
					console.log('Email change failed.');
					console.log(`HasEmailMeta: ${v.hasEmailMeta}`);
					return reject(new ApiError(404, 'NOT_FOUND'));
				}
			}).catch(reject);
		});
	}
  
	static passwordRecovery(v) {
		return new Promise(resolve => {
			return resolve({redirect: `/a/reset-password?a=${v.verification_id}`});
		});
	}
  
	/**
   * Maps verification to a verification process method using id
   * @param {*} verification_id - ID of the verification.
   */
	static process(verification_id) {
		return new Promise((resolve, reject) => {
			Verification.findOne({verification_id}).then(v => {
				const types = {
					'password-recovery': { 
						handler: this.passwordRecovery, 
						str: 'Password Reset'
					},
					'new-account': { 
						handler: this.verifyAccount,
						str: 'Account verification' 
					},
					'email-change': { 
						handler: this.verifyEmail,
						str: 'Email verification'
					},
					default: {
						str: 'Verification'
					}
				};

				if(!v) { return reject(new ApiError(404, 'NOT_FOUND'), null, {type: _type.str}); }
				const _type = types[v.verification_type] ? types[v.verification_type] : types.default;
        
				if(!_type.handler) {
					return reject(new ApiError(501, 'BAD_VERIFICATION_METHOD'));
				}
        
				if(v.isExpired || v.handled) {
					return resolve({redirect: `/error?a=${verification_id}`});
				}
        
				return resolve(_type.handler(v));
			}).catch(reject);
		});
	} 

}

module.exports = VerificationController;