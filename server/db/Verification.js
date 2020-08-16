const { v4: uuidv4 } = require('uuid');

module.exports = (mongoose) => {

	const Schema = mongoose.Schema;
	const Verification = new Schema({
		user_id: {
			type: Schema.Types.ObjectId,
		},
		verification_id: {
			type: String,
			default: uuidv4()
		},
		verification_type: {
			type: String,
			enum: ['password-recovery', 'new-account', 'email-change'],
		},
		meta: Schema.Types.Mixed,
		expires: {
			type: Date,
			default: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
		}
	}, {timestamps: true});
  
	Verification.virtual('isExpired').get(function() {
		let now = new Date();
		let expiry = new Date(this.expires);
		return now > expiry;
	});
  
	Verification.virtual('hasEmailMeta').get(function() {
		return !!this.meta && this.meta.newEmail && this.meta.oldEmail;
	});

	return mongoose.model('Verification', Verification);

};