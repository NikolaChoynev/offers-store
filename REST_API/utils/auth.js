const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    companyModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {
    return function(req, res, next) {
        const token = req.cookies[authCookieName] || '';
        Promise.all([
                jwt.verifyToken(token),
                tokenBlacklistModel.findOne({ token })
            ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('blacklited token'));
                }
                if (data.role === "company") {
                    companyModel.findById(data.id)
                        .then(user => {
                            req.user = user;
                            req.isLogged = true;
                            next();
                        })
                } else {
                    userModel.findById(data.id)
                        .then(user => {
                            req.user = user;
                            req.isLogged = true;
                            next();
                        })
                }

            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklited token', 'jwt must be provided'].includes(err.message)) {
                    console.error(err);
                    res.status(401).send({ message: "Invalid token!" });
                    return;
                }
                next(err);
            })
    }
}

module.exports = auth;