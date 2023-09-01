/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { NotFoundError, BadRequestError } from '../../errors/index';

import Users from '../../models/user-model';

const updateAvatar = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { avatar } = (req as Request).body;
    const options = { new: true };
    const user = await Users.findByIdAndUpdate(
      (req as & { user: User}).user._id,
      { avatar },
      options,
    );

    if (!user) {
      next(new NotFoundError('пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

const updateUser = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { name, about } = (req as Request).body;
    const options = { new: true };
    const user = await Users.findByIdAndUpdate(
      (req as & { user: User}).user._id,
      { name, about },
      options,
    );

    if (!user) {
      next(new NotFoundError('пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export { updateAvatar, updateUser };
