const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
	const Schema = mongoose.Schema;

	const User = new Schema({
		username: {
			type: String,
			unique: true,
			lowercase: true
		},
		email: {
			type: String,
			unique: true,
			lowercase: true
		},
		password: String,
		rights: {
			type: Number,
			max: 2
		},
		verified: {
			type: Boolean,
			default: false,
		}
	}, {timestamps: true});

	/**
    Hash password before save
  */
	User.pre('save', function() {
		this.password = bcrypt.hashSync(this.password, 10);
	});

	/** 
		Send verification email after save
	 */
	User.post('save', function() {
		if(!this.verified) {
			console.log(`Sending verification email to ${this.email}`);
			// TODO - Send an email after save, but only if the account is not verified
		}
	});

	return mongoose.model('User', User);
};