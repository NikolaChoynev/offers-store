const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const offerSchema = new mongoose.Schema({
    offerName: {
        type: String,
        required: true
    },
    offerType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.startsWith("http://") || v.startsWith("https://");
            },
            message: props => `${props.value} must starts with http: or https: !`
        }
    },
    term: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
    company: {
        type: ObjectId,
        ref: 'company'
    },
    comments: [{
        type: ObjectId,
        ref: 'comment'
    }],
    reservations: [{
        type: ObjectId,
        ref: 'user'
    }],

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('offer', offerSchema);