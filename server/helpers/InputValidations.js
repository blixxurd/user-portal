const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[a-zA-Z0-9_]{1,}$/;

module.exports = (body) => {
	const tests = {
		email: [
			{test: body.email && emailRegex.test(String(body.email).toLowerCase()), error: 'You\'ve entered an invalid email address.'}
		],
		username: [
			{test: body.username && body.username.length > 3 && body.username.length < 19, error: 'Your username must be more than 3 characters long, and no more than 18 characters long.'},
			{test: usernameRegex.test(String(body.username).toLowerCase()), error: 'Your username has invalid characters. It can only contain numbers, letters, and underscores.'},
		],
		password: [
			{test: body.password && body.password.length > 6, error: 'Your password must be at least 7 characters long.'},
		]
	};
  
	let testsForBody = {};
	for (let i = 0; i < Object.keys(body).length; i++) {
		const key = Object.keys(body)[i];
		if(tests[key]) {
			testsForBody[key] = tests[key];
		}
	}
  
	return testsForBody;
  
};