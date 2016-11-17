"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;
;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
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