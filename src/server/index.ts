import express from 'express';
// import spdy from 'spdy';
import 'dotenv/config';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import compression from 'compression';
// import fs from 'fs';

import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import index from './routes';

import { requestLogger, errorLogger, errorHandlerMiddleware } from './middlewares';
import { limiter, corsOptions, helmetConfig } from './utils';
import { NotFoundError } from './errors';

import dbConnect from './connect';

const PORT = process.env.PORT ?? 3005;
// const CERT_DIR = `${__dirname}/cert`;
// const useSSL = !!process.env.SSL;

const app = express();

app.use(compression({ brotli: { enabled: true, zlib: { } } }));
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

// const server = spdy.createServer(
//   {
//     // key: fs.readFileSync(`${CERT_DIR}/server.key`),
//     // cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
//   },
//   app,
// );
const listen = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};
// const listen = () => {
//   server.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log('SSL enabled');
//   });
// };

(async () => {
  await dbConnect();
  listen();
})();
