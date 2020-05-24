const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {

    static authenticate(username, password) {
        return new Promise((resolve, reject) => {
            User.findOne({username}).then(u => {
                let payload = {
                    valid: false,
                    token: null
                };
                if(!!u) {
                    const valid = bcrypt.compareSync(password, u.password);
                    if(valid) {
                        payload.valid = valid;
                        payload.token = jwt.sign({
                            id: u._id,
                            username: u.username,
                            email: u.email
                        }, process.env.AUTH_KEY, {
                            expiresIn: '12h'
                        });
                    }
                }
                return resolve(payload);
            }).catch(reject);
        });
    }

    static verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
                if (err) {
                  if(err.name == "TokenExpiredError") {
                      //expiredAt: 1408621000
                      return reject(new Error("Session expired."))
                  }
                  return reject(new Error("Bad Token."));
                }
                return resolve(decoded);
              });
        });
    }

}

module.exports = AuthController;