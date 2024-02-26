import express from 'express';
import 'dotenv/config';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import index from './routes';

import { requestLogger, errorLogger, errorHandlerMiddleware } from './middlewares';

import corsOptions from './utils/cors-options';
import { helmetConfig } from './utils/helmet-config';

import { NotFoundError } from './errors';

import limiter from './utils/limiter';

import dbConnect from './connect';

const port = process.env.PORT ?? 3000;

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy(helmetConfig));
} else if (process.env.NODE_ENV === 'development') {
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
// fix to public
// console.log('--', process.env);
app.get('*', (_req, res) => {
  res
    .status(200)
    .cookie('mode', process.env.NODE_ENV === 'production' ? '' : 'dev')
    .sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('*', () => {
  throw new NotFoundError('HTTP 404 Not Found');
});
app.use(errorLogger);
app.use(errorHandlerMiddleware);

const listen = () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

(async () => {
  await dbConnect();
  listen();
})();
