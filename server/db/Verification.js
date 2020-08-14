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
			enum: ['password-change', 'new-account', 'email-change'],
		},
		meta: Schema.Types.Mixed,
		expires: {
			type: Date,
			default: Date.now()
		}
	}, {timestamps: true});

	return mongoose.model('Verification', Verification);
};