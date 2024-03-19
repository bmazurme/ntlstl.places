/* eslint-disable spaced-comment */
/* eslint-disable max-len */
import express from 'express';
// import spdy from 'spdy';
import 'dotenv/config';
// import livereload from 'livereload';
// import connectLivereload from 'connect-livereload';
import compression from 'compression';
// import fs from 'fs';

// import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import index from './routes';

import { requestLogger, errorLogger, errorHandlerMiddleware } from './middlewares';
import { limiter, corsOptions, helmetConfig } from './utils';
import { NotFoundError } from './errors';

import dbConnect from './connect';

const PORT = process.env.PORT ?? 4000;
// const CERT_DIR = `${__dirname}/cert`;
// const useSSL = !!process.env.SSL;

//const allowlist = ['http://localhost:8081/', 'https://localhost:8081/'];
// eslint-disable-next-line func-names
// const corsOptionsDelegate = function (req: any, callback: any) {
//   let _corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     _corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     _corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, _corsOptions); // callback expects two parameters: error and options
// };

const app = express();
app.use(cors(corsOptions));
app.use(compression({ brotli: { enabled: true, zlib: { } } }));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

app.use(limiter);

// if (process.env.NODE_ENV === 'production') {
// app.use(helmet.hidePoweredBy());
// app.use(helmet.contentSecurityPolicy(helmetConfig));
// } else if (process.env.NODE_ENV === 'development') {
//   const liveReloadServer = livereload.createServer();

//   liveReloadServer.server.once('connection', () => {
//     setTimeout(() => {
//       liveReloadServer.refresh('/');
//     }, 100);
//   });

//   app.use(connectLivereload());
// }

app.use('/', index);
// app.use('/static', express.static(path.resolve(process.cwd(), 'static')));
// app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js'] }));
// fix to public
// app.get('*', (_req, res) => {
//   res
//     .status(200)
//     .cookie('mode', process.env.NODE_ENV === 'production' ? '' : 'dev')
//     .sendFile(path.resolve(__dirname, 'index.html'));
// });

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
