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

import User from './user.model';
import UserRole from './user-role.model';

interface RoleAttributes {
  id: number;
  name: string;
}

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'roles',
  modelName: 'Role',
})
export default class Tag extends Model<RoleAttributes, RoleCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @BelongsToMany(() => User, { through: () => UserRole })
  declare cardTags?: NonAttribute<Card[]>;
}
