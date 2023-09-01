import type { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const {
    status = err.status || 500,
    message = err.message,
  } = err;

  res.status(status).send({ message });

  next();
};

export default errorHandlerMiddleware;
