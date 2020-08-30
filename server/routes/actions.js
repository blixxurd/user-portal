const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/VerificationController');

module.exports = () => {

	router.get('/:id', (req, res, next) => {
		VerificationController.process(req.params.id).then(v => {
			if(v.redirect) {
				return res.redirect(`${process.env.CLIENT_INDEX}${v.redirect}`);
			}
			return res.redirect(`${process.env.CLIENT_INDEX}/a/success`);
		}).catch(next);
	});
  
	return router;

};