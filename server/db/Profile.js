module.exports = (mongoose) => {
	const Schema = mongoose.Schema;
	const Profile = new Schema({
		user_id: {
			type: Schema.Types.ObjectId,
			unique: true,
		},
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		phone: {
			type: String,
		},
	}, {timestamps: true});

	return mongoose.model('Profile', Profile);
};