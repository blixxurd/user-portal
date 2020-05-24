const createError = require('http-errors');
const { AuthController } = require('../controllers');

class AppMiddleware {

    static catchNotFound(req, res, next) {
        next(createError(404));
    }

    static handleErrors(err, req, res, next) {
        res.locals.status = err.status || 500;
        res.status(res.locals.status);
        res.json({
            message: err.message || 'Unidentified Error',
            status: res.locals.status
        });
    }

    static authorizeUser(req, res, next) {
        if(!!req.headers.authorization) {
            AuthController.verifyToken(req.headers.authorization).then(payload => {
                res.locals.user = payload;
                res.locals.user.token = req.headers.authorization;
                next();
            }).catch(err => {
                err.status = 401;
                next(err);
            });
        } else {
            next(createError(401));
        }
    }

}

module.exports = AppMiddleware;