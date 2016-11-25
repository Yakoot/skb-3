"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;
;
const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    values: {
        money: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            return _.pick(ret, ['name']);
        }
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map