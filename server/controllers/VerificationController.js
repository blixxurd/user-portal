const NotificationController = require('../controllers/NotificationController');
const Notify = new NotificationController();
const { Verification, User } = require('../db');

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
   * Handles the verification of a user account
   * @param {*} verification_id The uuidv4 verification id. 
   */
	static verifyAccount(verification_id) {
		return new Promise((resolve, reject) => {
			Verification.findOne({verification_id}).then(v => {
				// Detect null
				if(!v) {
					const vError = new Error('Not found.');
					vError.status = 404;
					// TODO - Why the fuck is this not erroring correctly. 
					return reject(vError);
				}
        
				if(v.isExpired) {
					// TODO - Why the fuck is this not erroring correctly.
					return reject(new Error('This link is expired. Please login and request a new verification.'));
				}
        
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
						return reject(new Error('This user has already been verified.'));
					}
				}).catch(reject);
			}).catch(reject);
		});
	}

}

module.exports = VerificationController;