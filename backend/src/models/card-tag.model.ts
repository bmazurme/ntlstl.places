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

import Card from './card.model';
import Tag from './tag.model';

interface CardTagAttributes {
  id: number;
  cardId: number;
  tagId: number;
}

export type CardTagCreationAttributes = Optional<CardTagAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'cardTags',
  modelName: 'CardTag',
})
export default class CardTag extends Model<CardTagAttributes, CardTagCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Card)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare cardId: number;

  @ForeignKey(() => Tag)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare tagId: number;
}
