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
  
	Profile.virtual('responseData').get(function() {
		return {
			first_name: this.first_name,
			last_name: this.last_name, 
			phone: this.phone,
			updatedAt: this.updatedAt
		};
	});

	return mongoose.model('Profile', Profile);
};