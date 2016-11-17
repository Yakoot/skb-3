"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;
;
const petSchema = new Schema({
    type: {
        type: String,
        enum: ["cat", "dog"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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