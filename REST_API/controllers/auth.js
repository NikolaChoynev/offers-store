const {
    userModel,
    companyModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData;
}

function register(req, res, next) {

    const { address, email, username, password, role } = req.body;

    if (role === "company") {
        return companyModel.create({ address, email, username, password, role })
            .then((createdUser) => {
                createdUser = bsonToJson(createdUser);
                createdUser = removePassword(createdUser);

                const token = utils.jwt.createToken({ id: createdUser._id, role: createdUser.role });
                if (process.env.NODE_ENV === 'production') {
                    res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
                } else {
                    res.cookie(authCookieName, token, { httpOnly: true })
                }
                res.status(200).send(createdUser);
            })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let field = err.message.split("index: ")[1];
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));

                    res.status(409)
                        .send({ message: `This ${field} is already registered!` });
                    return;
                }
                next(err);
            });
    } else {
        return userModel.create({ address, email, username, password, role })
            .then((createdUser) => {
                createdUser = bsonToJson(createdUser);
                createdUser = removePassword(createdUser);

                const token = utils.jwt.createToken({ id: createdUser._id, role: createdUser.role });
                if (process.env.NODE_ENV === 'production') {
                    res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
                } else {
                    res.cookie(authCookieName, token, { httpOnly: true })
                }
                res.status(200).send(createdUser);
            })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let field = err.message.split("index: ")[1];
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));

                    res.status(409)
                        .send({ message: `This ${field} is already registered!` });
                    return;
                }
                next(err);
            });
    }
}

function login(req, res, next) {
    const { email, password, role } = req.body;
    if (role === "company") {
        companyModel.findOne({ email })
            .then(user => {
                return Promise.all([user, user ? user.matchPassword(password) : false]);
            })
            .then(([user, match]) => {
                if (!match) {
                    res.status(401).send({ message: 'Wrong username or password' });
                    return
                }
                user = bsonToJson(user);
                user = removePassword(user);

                const token = utils.jwt.createToken({ id: user._id, role: role });

                if (process.env.NODE_ENV === 'production') {
                    res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
                } else {
                    res.cookie(authCookieName, token, { httpOnly: true })
                }
                res.status(200)
                    .send(user);
            })
            .catch(err => res.send(err));
    } else {
        userModel.findOne({ email })
            .then(user => {
                return Promise.all([user, user ? user.matchPassword(password) : false]);
            })
            .then(([user, match]) => {
                if (!match) {
                    res.status(401).send({ message: 'Wrong username or password' });
                    return
                }
                user = bsonToJson(user);
                user = removePassword(user);

                const token = utils.jwt.createToken({ id: user._id, role: role });

                if (process.env.NODE_ENV === 'production') {
                    res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
                } else {
                    res.cookie(authCookieName, token, { httpOnly: true })
                }
                res.status(200)
                    .send(user);
            })
            .catch(err => res.send(err));
    }

}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(200)
                .send({ message: 'Logget out!' });
        })
        .catch(err => res.send(err));
}

function getProfileInfo(req, res, next) {
    const { _id: userId, role } = req.user;
    if (role === "company") {
        companyModel.findOne({ _id: userId }, { password: 0, __v: 0 })
            .populate('offers')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next);
    } else {
        userModel.findOne({ _id: userId }, { password: 0, __v: 0 })
            .populate('reservations')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next);
    }
}

function editProfileInfo(req, res, next) {
    const { _id: userId, role } = req.user;
    const { address, username, email } = req.body;
    if (role === "company") {
        companyModel.findOneAndUpdate({ _id: userId }, { address, username, email }, { runValidators: true, new: true })
            .then(user => { res.status(200).json(user) })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let field = err.message.split("index: ")[1];
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));

                    res.status(409)
                        .send({ message: `This ${field} is already registered!` });
                    return;
                }
                next(err);
            });
    } else {
        userModel.findOneAndUpdate({ _id: userId }, { address, username, email }, { runValidators: true, new: true })
            .then(user => { res.status(200).json(user) })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let field = err.message.split("index: ")[1];
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));

                    res.status(409)
                        .send({ message: `This ${field} is already registered!` });
                    return;
                }
                next(err);
            });
    }


}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    bsonToJson
}