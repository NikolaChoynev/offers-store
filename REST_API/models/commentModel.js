const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
    owner: {
        type: ObjectId,
        ref: 'user'
    },
    offer: {
        type: ObjectId,
        ref: 'offer'
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('comment', commentSchema);