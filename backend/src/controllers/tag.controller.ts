/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

import Tag from '../models/tag.model';

type User = { id: number; };

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const { id } = await Tag.create({ name });

    return res.status(201).send({ id, name });
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

    return res.status(201).send(tags);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { user: { id: userId } } = (req as Request & { user: User });

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+id)) {
      return next(new BadRequestError('bad request'));
    }

    const tag = await Tag.findOne({ where: { id } });

    if (!tag) {
      return new NotFoundError('tag was not find');
    }

    await Tag.destroy({ where: { id } });

    return res.status(200).send({ message: 'card was deleted', id });
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  const { user: { id: userId } } = (req as Request & { user: User });

  if (userId !== 1) {
    return next(new ForbiddenError('access denied'));
  }

  if (Number.isNaN(+id)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const tag = await Tag.findOne({ where: { id } });

    if (!tag) {
      return new NotFoundError('card was not found');
    }

    await tag.update({ name });

    return res.status(200).send({ id: tag.id, name: tag.name });
  } catch (err) {
    next(err);
  }
};
