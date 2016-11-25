"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;
;
const petSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["cat", "dog", "rat"],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            return _.pick(ret, ['name', 'type', "owner"]);
        }
    }
});
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
//# sourceMappingURL=Pet.js.map