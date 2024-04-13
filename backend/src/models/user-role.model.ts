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
import Role from './role.model';

interface UserRoleAttributes {
  id: number;
  userId: number;
  roleId: number;
}

export type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'userRoles',
  modelName: 'UserRole',
})
export default class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare roleId: number;
}
