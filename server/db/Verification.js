const { v4: uuidv4 } = require('uuid');

module.exports = (mongoose) => {

	const Schema = mongoose.Schema;
	const Verification = new Schema({
		user_id: {
			type: Schema.Types.ObjectId,
		},
		verification_id: {
			type: String,
			default: uuidv4 //https://stackoverflow.com/questions/51025857/node-js-can-not-set-default-uuid-with-mongoose
		},
		verification_type: {
			type: String,
			enum: ['password-recovery', 'new-account', 'email-change'],
		},
		meta: Schema.Types.Mixed,
		expires: {
			type: Date,
			default: function() {
				return new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
			}
		},
		handled: {
			type: Boolean,
			default: false,
		}
	}, {timestamps: true});
  
	Verification.virtual('publicResponse').get(function() {
		let now = new Date();
		let expiry = new Date(this.expires);
		return {
			expired: now > expiry,
			handled: this.handled,
			type: this.verification_type
		};
	});
  
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