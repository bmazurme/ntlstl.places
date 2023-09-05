/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model, Types,
} from 'mongoose';
// import isUrl from 'validator/lib/isURL';

export interface ICard extends Document {
  name: string;
  link: string;
  userId: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface CardModel extends Model<ICard> {
  findCardById: (id: string) => Promise<ICard | undefined>;
}

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    // validate: {
    //   validator: (link: string) => isUrl(link),
    //   message: 'некорректные данные',
    // },
  },
  userId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fieldname: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  encoding: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

export default model<ICard, CardModel>('Card', CardSchema);
