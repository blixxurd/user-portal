/** INCLUDES */
require('dotenv').config();
const EventEmitter = require('events');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const { AppMiddleware } = require('./middleware');
const { db } = require('./db');
const cors = require('cors');

class App extends EventEmitter {

	constructor() {
		super();
		this.app = express();
		this.routeVars = {
			mid: AppMiddleware
		};
		db.connect(process.env.MONGO_URL, {
			useNewUrlParser: true, 
			useUnifiedTopology: true
		}).then(async () => {
			console.log('[App] Mongoose Connected');
			this.ready();
		}).catch(err => {
			console.error(err);
			process.exit(0);
		});
	}

	init() {
		// Cross Site Requests
		if(process.env.NODE_ENV == 'development') {
			console.log('[App] Initiated Dev Server CORS Settings.');
			this.app.use(cors({
				origin: 'http://localhost:8080',
				optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
			}));
		}

		// Middlewares
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));

		// Public routes
		this.app.use(express.static(path.join(__dirname, 'public')));

		// App Routes
		this.app.use('/api/v1', routes.api(this.routeVars));
		this.app.use('/actions', routes.actions(this.routeVars));

		// Catch Errors
		this.app.use(AppMiddleware.catchNotFound);
		this.app.use(AppMiddleware.handleErrors);
	}

	ready() {
		//Bug with event emitter -- 1s timeout defers to next tick. 
		setTimeout(() => {
			this.emit('ready');
		}, 1);
	}

}

module.exports = App;
