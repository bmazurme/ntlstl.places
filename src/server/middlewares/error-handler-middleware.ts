import type { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const { status = 500, message } = err;

  res.status(status).send({ message });

  next();
};
