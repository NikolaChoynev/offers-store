const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 8000,
        dbURL: 'mongodb://localhost:27017/offer_store',
        origin: ['http://localhost:5555', 'http://localhost:4200'],
        authCookieName: 'auth_cookie'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];