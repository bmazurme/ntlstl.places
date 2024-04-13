import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { NonAttribute } from '@sequelize/core';
import { Optional } from 'sequelize';

import Card from './card.model';
import CardTag from './card-tag.model';

interface TagAttributes {
  id: number;
  name: string;
}

export type TagCreationAttributes = Optional<TagAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'tags',
  modelName: 'Tag',
})
export default class Tag extends Model<TagAttributes, TagCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @BelongsToMany(() => Card, { through: () => CardTag })
  declare cardTags?: NonAttribute<Card[]>;
}
