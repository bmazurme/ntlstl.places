import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  avatar: string;
  name: string;
  about: string;
  email: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare avatar: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare about: string;

  @Column(DataType.STRING)
  declare email: string;
}
