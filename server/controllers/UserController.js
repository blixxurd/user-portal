const { User } = require('../db');

class UserController {

    static create({username, password, email}) {
        return new Promise((resolve, reject) => {
            const user = new User({ username, password, email});
            user.save().then(resolve).catch(reject);
        });
    }

    static update({username, password, email}) {
        return new Promise((resolve, reject) => {
            
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            const fields = 'username email createdAt updatedAt';
            User.findOne({_id: id}).select(fields).then(resolve).catch(reject);
        });
    }
    
}

module.exports = UserController;