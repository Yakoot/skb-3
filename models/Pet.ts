import * as mongoose from 'mongoose';
import _ = require("lodash");
const {Schema} = mongoose;


interface IPet {
    type: string;
    name: string;
    owner: string;
};
interface IPetModel extends IPet, mongoose.Document { }

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
    transform: (doc: any, ret: any) => {
      return _.pick(ret, ['name', 'type', "owner"]);
    }
  }
});

const Pet = mongoose.model <IPetModel>('Pet', petSchema);

export = Pet;
