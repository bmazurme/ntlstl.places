import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';
import TelegramLogger, { Options } from 'winston-telegram';

const option: Options = {
  token: process.env.TELEGRAM_TOKEN ?? '',
  chatId: Number(process.env.TELEGRAM_CHAT_ID),
  level: 'error',
};

winston.add(new TelegramLogger(option));

const transportRequest = new winston.transports.DailyRotateFile({
  filename: 'logs/request-%DATE%.log', // указываем формат имени файла
  datePattern: 'YYYY-MM-DD-HH', // указываем шаблон для даты
});

const transportError = new winston.transports.DailyRotateFile({
  filename: 'errors/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
});

export const requestLogger = expressWinston.logger({
  transports: [transportRequest],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [transportError],
  format: winston.format.json(),
});
