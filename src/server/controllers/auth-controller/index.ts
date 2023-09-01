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
    const user = await Users.findOne({ defaultEmail: req.user.default_email });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.send({
      defaultEmail: user.defaultEmail,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (err) {
    next(err);
  }
};

export { logout, getUserMe };
