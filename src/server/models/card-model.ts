/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, Document, model, Model, Types,
} from 'mongoose';
import isUrl from 'validator/lib/isURL';

export interface ICard extends Document {
  name: string;
  link: string;
  userId: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
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
    validate: {
      validator: (link: string) => isUrl(link),
      message: 'некорректные данные',
    },
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
});

export default model<ICard, CardModel>('Card', CardSchema);
