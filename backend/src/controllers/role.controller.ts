/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

import Role from '../models/role.model';

type User = { id: number; };

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: { id: userId } } = (req as Request & { user: User });
    const { name } = req.body;

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    const { id } = await Role.create({ name });

    return res.status(201).send({ id, name });
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

    return res.status(201).send(roles);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { user: { id: userId } } = (req as Request & { user: User });

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+id)) {
      return next(new BadRequestError('bad request'));
    }

    const role = await Role.findOne({ where: { id } });

    if (!role) {
      return new NotFoundError('role was not find');
    }

    await Role.destroy({ where: { id } });

    return res.status(200).send({ message: 'role was deleted', id });
  } catch (err) {
    next(err);
  }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  const { id: userId } = (req as Request & { user: User }).user;

  if (userId !== 1) {
    return next(new ForbiddenError('access denied'));
  }

  if (Number.isNaN(+id)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const role = await Role.findOne({ where: { id } });

    if (!role) {
      return new NotFoundError('card was not found');
    }

    await role.update({ name });

    return res.status(200).send({ id: role.id, name: role.name });
  } catch (err) {
    next(err);
  }
};
