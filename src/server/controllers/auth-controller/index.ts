/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '../../errors/index';

import Users from '../../models/user-model';

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await Users.findOne({ where: { email: req.user.default_email }});

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

export { logout, getUserMe };
