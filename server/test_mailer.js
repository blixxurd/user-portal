require('dotenv').config();

const NotificationController = require('./controllers/NotificationController');
const Notify = new NotificationController();

Notify.sendActivationEmail({
	username: 'aaron133',
	email: 'aaron@polymathx.com'
},'09jf0394f0934jg0-43kh-045hm4-9hm5-06h').then(res => {
	console.log(res);
}).catch(e => {
	console.error(e);
});

// Notify.compileTemplate('new-account', {
// 	website_name: 'User Portal',
// 	website_url: 'https://localhost:8080',
// 	action_url: 'https://localhost:8080/do-the-thing',
// 	name: 'Testman'
// }).then(res => {
// 	Notify.sendEmail({to: 'test@polymathx.com', subject: 'Test Transactional Email', html: res}).then(mail => {
// 		console.log(mail);
// 	});
// });