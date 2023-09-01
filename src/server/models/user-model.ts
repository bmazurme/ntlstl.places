/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model,
} from 'mongoose';

import validator from 'validator';
import isUrl from 'validator/lib/isURL';

export interface IUser extends Document {
  defaultEmail: string;
  name: string;
  about: string;
  avatar: string;
}

export interface UserModel extends Model<IUser> {
  findUserByCredentials: (defaultEmail: string) => Promise<IUser | undefined>;
}

const UserSchema = new Schema({
  defaultEmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(defaultEmail: string) {
        return validator.isEmail(defaultEmail);
      },
      defaultEmail: 'Введён некорректный email',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link: string) => isUrl(link),
      message: 'некорректные данные',
    },
  },
});

export default model<IUser, UserModel>('User', UserSchema);
