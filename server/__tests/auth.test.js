require('dotenv').config();
const { db } = require('../db');
const { UserController, AuthController } = require('../controllers');

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

let user = {
	username: makeid(10),
	email: makeid(6) + '@' + makeid(4) + '.biz',
	password: makeid(12)
};


beforeAll(async () => {
	db.connect(process.env.MONGO_URL, {
		useNewUrlParser: true, 
		useUnifiedTopology: true
	}).then(async () => {
		console.log('Mongoose Connected');
	}).catch(err => {
		console.error(err);
	});
});

test('register user', async () => {
	let newUser = await UserController.create(user);
	console.log(newUser);
	expect(newUser).toHaveProperty('_id');
	expect(newUser).toHaveProperty('username', user.username.toLowerCase());
});

test('authenticate user', async () => {
	let auth = await AuthController.authenticate(user.username, user.password).then(authResponse => {
		return authResponse;
	});
	if(auth.token && auth.valid) {
		user.token = auth.token;
	}
	expect(auth).toHaveProperty('valid');
	expect(auth).toHaveProperty('token');
});

test('authorize token', async () => {
	let decodedToken = await AuthController.verifyToken(user.token);
	expect(decodedToken).toHaveProperty('username');
	expect(decodedToken).toHaveProperty('id');
});



afterAll(async () => {
	await db.connection.close();
});