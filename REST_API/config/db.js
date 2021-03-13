const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(config.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }).then((data) => {
        console.log('Connected to database successfully!');
    });
};