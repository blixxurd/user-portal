const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../helpers/ErrorHandlers');

class AuthController {

	/**
   * 
   * @param {*} username 
   * @param {*} password 
   */
	static authenticate(username, password) {
		return new Promise((resolve, reject) => {
			User.findOne({username}).then(u => {
				let payload = {
					valid: false,
					token: null
				};
				if(u) {
					const valid = bcrypt.compareSync(password, u.password);
					if(valid) {
						if(!u.verified) {
							return reject(new ApiError(401, 'ACCOUNT_VERIFICATION_REQUIRED'));
						}
						payload.valid = valid;
						payload.token = jwt.sign({
							id: u._id,
							username: u.username,
							email: u.email
						}, process.env.AUTH_KEY, {
							expiresIn: '12h'
						});
					}
				}
				return payload.valid ? resolve(payload) : reject(new ApiError(401, 'INVALID_CREDENTIALS'));
			}).catch(reject);
		});
	}

	/**
   * Verify the authenticity of a user's JWT Token
   * @param {*} token 
   */
	static verifyToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
				if (err) {
					if(err.name == 'TokenExpiredError') {
						//expiredAt: 1408621000
						return reject(new ApiError(401, 'EXPIRED_TOKEN'));
					}
					return reject(new ApiError(401, 'BAD_TOKEN'));
				}
				return resolve(decoded);
			});
		});
	}

}

module.exports = AuthController;