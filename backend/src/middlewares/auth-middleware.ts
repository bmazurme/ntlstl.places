// export default authMiddleware;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { UnauthorizedError } from '../errors';
import User from '../models/user.model';

const authMiddleware = (req: any, _res: Response, next: NextFunction) => {
  const { token } = req.cookies as unknown as Record<string, string>;
  const DEV_JWT_SECRET = process.env.DEV_JWT_SECRET || 'DEV_JWT_SECRET';

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, DEV_JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload as User;

  next();
};

export default authMiddleware;
