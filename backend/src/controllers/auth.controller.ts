/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '../errors/index';

import User from '../models/user.model';

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

export const getUserMe = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: { email: (req as Request & { user: { default_email: string; } }).user.default_email },
      // attributes: { exclude: ['email', 'createdAt', 'updatedAt'] },
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      id: user.id,
    });
  } catch (err) {
    next(err);
  }
};
