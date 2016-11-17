import * as mongoose from 'mongoose';
import _ = require("lodash");
const {Schema} = mongoose;


interface IUser {
    name: string;
};
interface IUserModel extends IUser, mongoose.Document { }

const userSchema = new Schema({
  name: {
    type: String,
    required: true
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
