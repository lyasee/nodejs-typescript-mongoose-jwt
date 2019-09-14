import {Schema, Document, model} from 'mongoose';
import {IUser} from '../typings/auth/IUser';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser & Document>('users', UserSchema);
