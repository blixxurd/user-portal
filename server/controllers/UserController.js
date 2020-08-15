const { User, Profile } = require('../db');
const VerificationController = require('./VerificationController');

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

	// static updateUser({password, email}) {
	// 	return new Promise((resolve, reject) => {
	// 		// If password is updated, we should created a 

	// 		// If email is updated, we should
	// 	});
	// }

	// static updateProfile(profileData) {
	// 	return new Promise((resolve, reject) => {
            
	// 	});
	// }

	// static updatePasswordFromVerification() {
	// 	return new Promise((resolve, reject) => {
            
	// 	});
	// }

	/**
   * Gets a user's profile by ID
   * @param {String} id 
   */
	static getProfile(id) {
		return new Promise((resolve, reject) => {
			User.findOne({_id: id}).select(fields).then(resolve).catch(reject);
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