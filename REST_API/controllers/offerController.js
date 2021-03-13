const { offerModel, userModel, companyModel } = require('../models');
const { bsonToJson } = require('../controllers/auth');

function getOffers(req, res, next) {
    offerModel.find({})
        .populate('company reservations')
        .then(offers => res.status(200).json(offers))
        .catch(next);
}

function getOffer(req, res, next) {
    const { offerId } = req.params;

    offerModel.findById(offerId)
        .populate({
            path: 'comments',
            populate: {
                path: 'owner'
            }
        })
        .populate('company')
        .exec()
        .then(offer => res.status(200).json(offer))
        .catch(next);
}

function createOffer(req, res, next) {
    const { offerName, offerType, description, price, imageUrl, term } = req.body;
    const { _id: company, role } = req.user;
    if (role !== "company") {
        return;
    }
    offerModel.create({ offerName, offerType, description, price, imageUrl, term, company })
        .then(offer =>
            companyModel.updateOne({ _id: company }, { $addToSet: { offers: offer._id } })
            .then(res.status(200).json(offer)))
        .catch(next);
}

function editOffer(req, res, next) {
    const { offerName, offerType, description, price, imageUrl, term } = req.body;
    const { offerId } = req.params;

    offerModel.findOneAndUpdate({ _id: offerId }, { offerName, offerType, description, price, imageUrl, term }, { runValidators: true, new: true })
        .populate('company')
        .then(offer => res.status(200).json(offer))
        .catch(next);
}

function deleteOffer(req, res, next) {
    const { offerId } = req.params;
    const { _id: company } = req.user;

    Promise.all([
            offerModel.findOneAndDelete({ _id: offerId }),
            companyModel.findOneAndUpdate({ _id: company }, { $pull: { offers: offerId } }),
            userModel.find({})
        ])
        .then(([deletedOne, _, users]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
            users.forEach(user => {
                id = user._id;
                userModel.findOneAndUpdate({ _id: id }, { $pull: { reservations: offerId } })
                    .then()
                    .catch()
            });
        })
        .catch(next);

}

function bookingOffer(req, res, next) {
    const { offerId } = req.params;
    const { _id: userId, role } = req.user;

    offerModel.findById({ _id: offerId })
        .then(offer => {
            if (role === "company") {
                res.status(401).json({ message: 'Not allowed!' })
            } else if (offer.reservations.includes(userId)) {
                res.status(201).json({ message: 'You allredy reserved it!' })
            } else {
                return Promise.all([
                        offerModel.findOneAndUpdate({ _id: offerId }, { $addToSet: { reservations: userId } }, { new: true }),
                        userModel.findOneAndUpdate({ _id: userId }, { $push: { reservations: offerId } })
                    ])
                    .then(([updatedProduct, _]) => {
                        res.status(200).json({ message: 'You resevre it succsefully! ' });
                    })
                    .catch(next);
            }
        })
        .catch(next);
}


module.exports = {
    getOffers,
    getOffer,
    createOffer,
    editOffer,
    deleteOffer,
    bookingOffer
}