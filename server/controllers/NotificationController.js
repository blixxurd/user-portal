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

		this.tplDefaults = {
			website_name: process.env.NOTIFICATION_WEBSITE_NAME || 'User Portal',
			website_url: process.env.WEBSITE_URL || 'http://example.com/',
		};

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

	/**
   * Compiles a template from a set of variables 
   * @param {String} templateName The name of the template
   * @param {Object} vars The variables to populate the template
   */
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

	/**
   * Basic method to send email
   * @param {Object} mailSendParams {to, subject, text, html}
   */
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

	/**
   * Sends an email using a template from the mail templates folder
   * @param {Object} param0 -  {to, subject, templateName, templateVars}
   */
	sendMailFromTemplate({to, subject, templateName, templateVars}) {
		return new Promise((resolve, reject) => {
			const tpl = {...this.tplDefaults, ...templateVars};
			this.compileTemplate(templateName, tpl).then(res => {
				this.sendEmail({to, subject, html: res}).then(resolve).catch(reject);
			}).catch(reject);
		});
	}

	/**
   * Sends an account activation email to the user
   * @param {Object} user User object, must include email & username
   * @param {String} activationKey UUIDv4 Key for Verification DB Entry.
   */
	sendActivationEmail(user, activationKey) {
		const templateVars = {
			action_url: `${process.env.WEBSITE_URL}/actions/activate/${activationKey}`,
			name: user.username
		};
		return this.sendMailFromTemplate({
			to: user.email,
			subject: 'Please Activate Your Account',
			templateName: 'new-account',
			templateVars
		});
	}

}

module.exports = NotificationsController;