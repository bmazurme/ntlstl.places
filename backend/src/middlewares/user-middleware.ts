// export default authMiddleware;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { BadRequestError } from '../errors';
import User from '../models/user.model';

const userMiddleware = (req: any, _res: Response, next: NextFunction) => {
  const { token } = req.cookies as unknown as Record<string, string>;
  const DEV_JWT_SECRET = process.env.DEV_JWT_SECRET || 'DEV_JWT_SECRET';

  let payload;

  if (token) {
    try {
      payload = jwt.verify(token, DEV_JWT_SECRET);
    } catch (err) {
      throw new BadRequestError();
    }
  }

  req.user = payload as User;

  next();
};

export default userMiddleware;
