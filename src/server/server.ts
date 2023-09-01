import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { config as dotEnvConfig } from 'dotenv';
import cors from 'cors';

import index from './routes';

import { requestLogger, errorLogger } from './middlewares/logger-middleware';
import errorHandlerMiddleware from './middlewares/error-handler-middleware';

import corsOptions from './utils/cors-options';

import { NotFoundError } from './errors';

import limiter from './utils/limiter';

dotEnvConfig();

const pth = process.env.PTH ?? 'mongodb://127.0.0.1:27017/mesto';

const helmetConfig = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
    connectSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
    styleSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
    imgSrc: ['*'],
  },
};

const port = process.env.PORT ?? 3000;

const app = express();

mongoose.connect(pth, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy(helmetConfig));
}

if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  app.use(connectLivereload());
}

app.use('/api/', index);

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));
app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js'] }));

app.get('*', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('*', () => {
  throw new NotFoundError('HTTP 404 Not Found');
});

app.use(errorLogger);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
