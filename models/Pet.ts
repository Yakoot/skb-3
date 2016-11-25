import * as mongoose from 'mongoose';
import _ = require("lodash");
const {Schema} = mongoose;


interface IPet {
    id: number;
    userId: number;
    user: string;
    type: string;
    color: string;
    age: number;
};
interface IPetModel extends IPet, mongoose.Document { }

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
    transform: (doc: any, ret: any) => {
      return _.pick(ret, ['name', 'type', "owner"]);
    }
  }
});

const Pet = mongoose.model <IPetModel>('Pet', petSchema);

export = Pet;
