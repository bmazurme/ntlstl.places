/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { NotFoundError, BadRequestError } from '../errors/index';

import User from '../models/user.model';

export const updateAvatar = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { avatar } = (req as Request).body;
    const user = await User.findOne(
      { where: { id: (req as & { user: User }).user.id } },
    );

    if (!user) {
      next(new NotFoundError('пользователь не найден'));
    }

    await user?.update({ avatar });

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export const updateUser = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { name, about } = (req as Request).body;
    const user = await User.findOne(
      { where: { id: (req as & { user: User }).user.id } },
    );

    if (!user) {
      next(new NotFoundError('пользователь не найден'));
    }

    await user?.update({ name, about });

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};
