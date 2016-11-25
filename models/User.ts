import * as mongoose from 'mongoose';
import _ = require("lodash");
const {Schema} = mongoose;


interface IUser {
    id: number;
    username: string;
    fullname: string;
    password: string;
    values: {
      money: string;
      origin: string;
    };
};
interface IUserModel extends IUser, mongoose.Document { }

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
    transform: (doc: any, ret: any) => {
      return _.pick(ret, ['name']);
    }
  }
});

const User = mongoose.model <IUserModel>('User', userSchema);

export = User;
