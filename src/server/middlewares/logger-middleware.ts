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
  // указываем формат имени файла
  filename: 'request-%DATE%.log',
  // указываем шаблон для даты
  datePattern: 'YYYY-MM-DD-HH',
});
const transportError = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
});

const requestLogger = expressWinston.logger({
  transports: [transportRequest],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [transportError],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
