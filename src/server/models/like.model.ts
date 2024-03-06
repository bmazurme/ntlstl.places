import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

import User from './user.model';
import Card from './card.model';

interface LikeAttributes {
  id: number;
  card_id: number;
  user_id: number;
}

export type LikeCreationAttributes = Optional<LikeAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'likes',
  modelName: 'Like',
})
export default class Like extends Model<LikeAttributes, LikeCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Card)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare card_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare user_id: number;
}
