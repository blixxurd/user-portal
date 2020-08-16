const NotificationController = require('../controllers/NotificationController');
const Notify = new NotificationController();
const { Verification, User } = require('../db');
const { ApiError } = require('../helpers/ErrorHandlers');
class VerificationController {
  
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
						await u.save();
						return resolve(u.responseData);
					} catch(e) {
						return reject(e);
					}
				} else {
					return reject(new ApiError(500, 'User is already verified.'));
				}
			}).catch(reject);
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
					console.log(v);
					try {
						u.email = v.meta.newEmail;
						await u.save();
						return resolve(u.responseData);
					} catch(e) {
						return reject(e);
					}
				} else {
					console.log('Email change failed.');
					console.log(`HasEmailMeta: ${v.hasEmailMeta}`);
					return reject(new ApiError(404, 'This link is no longer active.'));
				}
			}).catch(reject);
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
						handler: this.verifyAccount, 
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

				if(!v) { return reject(new ApiError(404, 'Not Found')); }
				const _type = types[v.verification_type] ? types[v.verification_type] : types.default;
        
				if(v.isExpired) {
					// TODO - Why the fuck is this not erroring correctly.
					return reject(new ApiError(410, `This ${_type.str} link is expired.`));
				}
        
				if(!_type.handler) {
					return reject(new ApiError(501, 'Unsupported Verification Method.'));
				}
        
				return resolve(_type.handler(v));
			}).catch(reject);
		});
	} 

}

module.exports = VerificationController;