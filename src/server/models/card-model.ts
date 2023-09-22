import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';

import User from './user-model';
import Like from './like-model';

interface CardAttributes {
  id: number;
  name: string;
  link: string;
  user_id: number;
  // likes: [];

  // createdAt: string;
  // fieldname: string;
  // originalname: string;
  // encoding: string;
  // mimetype: string;
  // destination: string;
  // filename: string;
  // path: string;
  // size: number;
}

export type CardCreationAttributes = Optional<CardAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'cards',
  modelName: 'Card',
})
export default class Card extends Model<CardAttributes, CardCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @Column(DataType.STRING)
    name!: string;

  @Column(DataType.STRING)
    link!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
    user_id!: number;

  @HasMany(() => Like)
    likes!: Like[];
}
