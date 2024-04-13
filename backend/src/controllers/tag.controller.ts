/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

import Tag from '../models/tag.model';

type User = { id: number; };

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: { name: string } = req.body;
    const tag = await Tag.create({ name });

    return res.status(201).send(tag);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
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
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: tagId } = req.params;
    const { id: userId } = (req as Request & { user: User }).user;

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+tagId)) {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    const tag = await Tag.findOne({ where: { id: tagId } });

    if (!tag) {
      return new NotFoundError('tag was not find');
    }

    await Tag.destroy({ where: { id: tagId } });

    return res.status(200).send({ message: 'card was deleted', id: (req as Request).params.id });
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const { id: tagId } = req.params;
  const { name } = req.body;
  const { id: userId } = (req as Request & { user: User }).user;

  if (userId !== 1) {
    return next(new ForbiddenError('access denied'));
  }

  if (Number.isNaN(+tagId)) {
    return next(new BadRequestError('переданы некорректные данные в метод'));
  }

  try {
    const tag = await Tag.findOne({ where: { id: tagId } });

    if (!tag) {
      return new NotFoundError('card was not found');
    }

    await tag.update({ name });

    return res.status(200).send({ id: tag.id, name: tag.name });
  } catch (err) {
    next(err);
  }
};
