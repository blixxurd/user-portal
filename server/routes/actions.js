const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/VerificationController');

module.exports = () => {

	router.get('/:id', (req, res, next) => {
		VerificationController.process(req.params.id).then(v =>{
			return res.json(v);
		}).catch(next);
		//For future self -- just add 2 new methods in VerificationController
	});
  
	return router;

};