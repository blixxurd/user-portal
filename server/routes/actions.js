const express = require('express');
const router = express.Router();
const Verification = require('../controllers/VerificationController');

module.exports = () => {

	router.get('/activate/:id', (req, res, next) => {
		Verification.verifyAccount(req.params.id).then(verificationResult => {
			return res.json(verificationResult);
		}).catch(next);
	});
  
	return router;

};