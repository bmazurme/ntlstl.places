/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors';

import Tag from '../models/tag.model';
import CardTag from '../models/card-tag.model';

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

export const bindCardAndTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId, tagId } = req.body;
    const link = await CardTag.create({ cardId, tagId });

    return res.status(201).send(link);
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
