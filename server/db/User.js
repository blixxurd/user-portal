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
		password: String
	}, {timestamps: true});

	/**
    Hash password before save
  */
	User.pre('save', function() {
		this.password = bcrypt.hashSync(this.password, 10);
	});

	return mongoose.model('User', User);
};