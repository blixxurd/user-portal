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
  
	User.virtual('responseData').get(function() {
		return {
			username: this.username,
			verified: this.verified,
			updatedAt: this.updatedAt
		};
	});

	/**
    Hash password before save
  */
	User.pre('save', function() {
		if (this.isModified('password')) {
			this.password = bcrypt.hashSync(this.password, 10);
		}
	});

	return mongoose.model('User', User);
};