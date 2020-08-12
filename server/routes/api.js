const express = require('express');
const router = express.Router();
const { AppMiddleware } = require('../middleware');
const { AuthController, UserController } = require('../controllers');



module.exports = ({ mid }) => {

  router.post('/register', AppMiddleware.validateRegistration, (req, res, next) => {
    const user = {
      username: req.body.username, 
      password: req.body.password,
      email: req.body.email
    };
    if(req.errors.length > 0) {
      return res.json({errors: req.errors, errorType: 'soft', status: 200});
    } else {
      UserController.create(user).then(authMember => {
        return res.json({userId: authMember._id, email: authMember.email});
      }).catch(e => {
        if(!!e.code && e.code == 11000) {
          // Duplicate
          const dupeKey = Object.keys(e.keyPattern)[0];
          return res.json({errors: [`That ${dupeKey} is already taken. Please choose another.`], errorType: 'soft', status: 200, context: e.name+e.code});
        } else {
          return next(e);
        }
      });
    }
  });

  router.post('/auth', (req, res, next) => {
      AuthController.authenticate(req.body.username, req.body.password).then(authDetail => {
        return res.json(authDetail);
      }).catch(next);
  });

  router.get('/user', mid.authorizeUser, (req, res, next) => {
      UserController.get(res.locals.user.id).then(user => {
        return res.json(user);
      }).catch(next);
  });

  return router;

}