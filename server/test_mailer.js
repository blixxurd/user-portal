require('dotenv').config();

const NotificationController = require('./controllers/NotificationController');
const Notify = new NotificationController();

Notify.compileTemplate('new-account', {
	website_name: 'User Portal',
	website_url: 'https://localhost:8080',
	action_url: 'https://localhost:8080/do-the-thing',
	name: 'Testman'
}).then(res => {
	Notify.sendEmail({to: 'test@polymathx.com', subject: 'Test Transactional Email', html: res}).then(mail => {
		console.log(mail);
	});
});