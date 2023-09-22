import { config as dotEnvConfig } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import User from './models/user-model';
import Card from './models/card-model';
import Like from './models/like-model';

dotEnvConfig();

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: +(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'newPassword',
  database: process.env.POSTGRES_DB ?? 'my-db-name',
  dialect: 'postgres',
};

console.log(sequelizeOptions);

const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([User, Card, Like]);

const dbConnect = async () => {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync({ force: false, alter: true }); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
