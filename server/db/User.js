const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const User = new Schema({
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: String
    }, {timestamps: true});

    /**
     * Hash password before save
     */
    User.pre('save', function() {
        //console.log(this);
        this.password = bcrypt.hashSync(this.password, 10);
    });

    return mongoose.model('User', User);
}