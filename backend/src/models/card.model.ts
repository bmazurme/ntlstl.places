import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { NonAttribute } from '@sequelize/core';
import { Optional } from 'sequelize';

import User from './user.model';
import Like from './like.model';

interface CardAttributes {
  id: number;
  name: string;
  link: string;
  user_id: number;
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
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare link: string;

  @BelongsTo(() => User, 'user_id')
  declare user?: NonAttribute<User>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare user_id: number;

  @HasMany(() => Like)
  declare likes: Like[];
}
