const { User, Profile } = require('../db');
const VerificationController = require('./VerificationController');
const { ApiError } = require('../helpers/ErrorHandlers');

class UserController {

	/**
   * Creates a new user 
   * @param {Object} userData - username, password, email
   */
	static create({username, password, email}) {
		return new Promise((resolve, reject) => {
			console.log(`Attempting new user registration for ${username}`);
			const user = new User({ username, password, email});
			const profile = new Profile({user_id: user._id});
			user.save().then(async (u) => {
				console.log(`Successfully registered new user ${u.username}`);
				const authMember = {
					userId: u.id,
					email: u.email,
				};
				try { 
					await profile.save();
					authMember.profileSaved = true;
					console.log(`Saved new user profile for ${u.username}.`);
					VerificationController.sendAccountVerification(u); // Send email in the background
				} catch (e) {
					console.error(e);
					return reject(new Error('Profile could not be saved'));
				}
				return resolve(authMember);
			}).catch(reject);
		});
	}

	static updateUser(id, {password, email}) {
		return new Promise((resolve, reject) => {
			User.findOne({_id: id}).then(async u => {
				let updates = {
					pending: [],
					complete: []
				};
				if(!!email && (email !== u.email)) {
					try {
						let exists = User.exists({email});
						if(exists) {
							return reject(new ApiError(422, 'EMAIL_TAKEN'));
						}
					} catch(e) {
						return reject(new ApiError(500, 'DATABASE_ERROR', e, {email}));
					}
					// Email address Change
					VerificationController.sendEmailVerification(u, email);
					updates.pending.push('email');
				}
				if(!!password) {
					u.password = password;
					updates.complete.push('password');
				}

				if(updates.pending.length == 0 && updates.complete.length == 0) {
					return reject(new ApiError(422, 'NO_INPUTS'));
				}
				try {
					await u.save();
					return resolve(updates);
				} catch(e) {
					return reject(e);
				}
			}).catch(reject);
		});
	}

	static updateProfile(id, profileData) {
		return new Promise((resolve, reject) => {
			if(!id || !profileData) {
				return reject(new ApiError(422, 'UPDATE_PROFILE_MISSING_FIELDS'));
			}
			Profile.findOneAndUpdate({user_id: id}, profileData, {new: true}).then(resolve).catch(reject);
		});
	}

	/**
   * Initiates password recover for a user based on email address.
   * @param {*} email 
   */
	static recoverPassword(email) {
		return new Promise((resolve, reject) => {
			if(!email) {
				return reject(new ApiError(422, 'RECOVER_PASSWORD_MISSING_FIELDS'));
			}
			User.findOne({email: email}).then(VerificationController.sendPasswordReset).then(resolve).catch(reject);
		});
	}

	/**
   * Gets a user's profile by ID
   * @param {String} id - User ID 
   */
	static getProfile(user_id) {
		return new Promise((resolve, reject) => {
			Profile.findOne({user_id}).then(resolve).catch(reject);
		});
	}

	/**
   * Gets user by _id
   * @param {String} id 
   */
	static getUser(id) {
		return new Promise((resolve, reject) => {
			const fields = 'username email createdAt updatedAt';
			User.findOne({_id: id}).select(fields).then(resolve).catch(reject);
		});
	}
    
}

module.exports = UserController;