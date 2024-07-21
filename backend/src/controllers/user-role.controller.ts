/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

import UserRole from '../models/user-role.model';

type User = { id: number; };

export const createUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = (req as Request & { user: User });
    const { userId, roleId } = req.body;

    if (user.id !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    const { id } = await UserRole.create({ userId, roleId });

    return res.status(201).send({ id, userId, roleId });
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRoles = await UserRole.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

    return res.status(201).send(userRoles);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const deleteUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { user: { id: userId } } = (req as Request & { user: User });

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+id)) {
      return next(new BadRequestError('bad request'));
    }

    const userRole = await UserRole.findOne({ where: { id } });

    if (!userRole) {
      return new NotFoundError('user-role was not find');
    }

    await UserRole.destroy({ where: { id } });

    return res.status(200).send({ message: 'user-role was deleted', id });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { userId, roleId } = req.body;
  const { user } = (req as Request & { user: User });

  if (user.id !== 1) {
    return next(new ForbiddenError('access denied'));
  }

  if (Number.isNaN(+id)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const userRole = await UserRole.findOne({ where: { id } });

    if (!userRole) {
      return new NotFoundError('card was not found');
    }

    await userRole.update({ userId, roleId });

    return res.status(200).send({ id: userRole.id, userId, roleId });
  } catch (err) {
    next(err);
  }
};
