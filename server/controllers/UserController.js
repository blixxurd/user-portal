const { User, Profile } = require('../db');

class UserController {

	static create({username, password, email}) {
		return new Promise((resolve, reject) => {
			const user = new User({ username, password, email});
			const profile = new Profile({user_id: user._id});
			Promise.all([
				user.save(),
				profile.save()
			]).then(resolve).catch(reject);
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

	static getProfile(id) {
		return new Promise((resolve, reject) => {
			User.findOne({_id: id}).select(fields).then(resolve).catch(reject);
		});
	}

	static getUser(id) {
		return new Promise((resolve, reject) => {
			const fields = 'username email createdAt updatedAt';
			User.findOne({_id: id}).select(fields).then(resolve).catch(reject);
		});
	}
    
}

module.exports = UserController;