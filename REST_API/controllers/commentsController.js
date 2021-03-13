const { userModel, offerModel, commentModel } = require('../models');

function newComment(text, owner, offer) {
    return commentModel.create({ text, owner, offer })
        .then(comment => {
            return Promise.all([
                offerModel.findByIdAndUpdate({ _id: offer }, { $push: { comments: comment._id } })
            ])
        })
}

function createComment(req, res, next) {
    const { offerId: offer } = req.params;
    const { _id: owner } = req.user;
    const { text } = req.body;

    newComment(text, owner, offer)
        .then(([updatedProduct]) => res.status(200).json(updatedProduct))
        .catch(next);
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { text } = req.body;
    const { _id: owner } = req.user;

    commentModel.findOneAndUpdate({ _id: commentId, owner }, { text }, { new: true })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next)
}

function deleteComment(req, res, next) {
    const { commentId, offerId } = req.params;
    const { _id: owner } = req.user;

    Promise.all([
            commentModel.findOneAndDelete({ _id: commentId, owner }),
            offerModel.findOneAndUpdate({ _id: offerId }, { $pull: { comments: commentId } })
        ])
        .then(([deletedOne, _]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user

    commentModel.findById({ _id: commentId })
        .then(comment => {
            if (comment.likes.includes(userId)) {
                commentModel.updateOne({ _id: commentId }, { $pull: { likes: userId } }, { new: true })
                    .then(() => res.status(200).json({ message: 'Unliked successful!' }))
                    .catch(next);

            } else {
                commentModel.updateOne({ _id: commentId }, { $push: { likes: userId } }, { new: true })
                    .then(() => res.status(200).json({ message: 'Liked successful!' }))
                    .catch(next);
            }
        })
        .catch(next);

}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    like
}