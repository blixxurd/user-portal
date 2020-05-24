const express = require('express');
const router = express.Router();
const { AuthController, UserController } = require('../controllers');



module.exports = ({ mid }) => {

  router.get('/', (req, res, next) => {
      res.json({
        title: "Polymath Express Starter"
      });
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