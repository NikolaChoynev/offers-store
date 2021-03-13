const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUTNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const companySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Name should be at least 3 characters'],
        validate: {
            validator: function(v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 chatacters'],
        validate: {
            validator: function(v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        }
    },
    role: {
        type: String,
        required: true
    },
    offers: [{
        type: ObjectId,
        ref: 'offer'
    }],

}, { timestamps: { createdAt: 'created_at' } });

companySchema.methods = {
    matchPassword: function(password) {
        return bcrypt.compare(password, this.password);
    }
}

companySchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = mongoose.model('company', companySchema);