const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

class NotificationsController {

	constructor() {

		this.sender = {
			name: process.env.NOTIFICATION_SENDER_NAME || 'Notification Messenger',
			email: process.env.NOTIFICATION_SENDER_ADDRESS || 'sender@test.com'
		};
    
		this.from = `"${this.sender.name}" <${this.sender.email}>`;

		this.mailer = nodemailer.createTransport({
			host: 'smtp.mailgun.org',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.MAILGUN_USER,
				pass: process.env.MAILGUN_PASS,
			},
		});
	}

	compileTemplate(templateName, vars = {}) {
		return new Promise((resolve, reject) => {
			const templateVars = /{{(.*?)\}}/g; // Finds anything that looks like {{this}}
			fs.readFile(path.join(__dirname, '..', 'mail', `${templateName}.html`), 'utf8', function(err, data) {
				if(err) {
					return reject(err);
				}
				const finalHTML = data.replace(templateVars, function(match) {
					let replacement = match.replace(/{|}/g, '');
					return vars[replacement];
				});
				return resolve(finalHTML);
			});
		});
	}

	sendEmail({to, subject, text, html}) {
		let config = {
			to: to,
			from: this.from,
			subject
		};
		if(html) {
			config.html = html;
		}
		if(text) {
			config.text = text;
		}
		return this.mailer.sendMail(config);
	}

}

module.exports = NotificationsController;