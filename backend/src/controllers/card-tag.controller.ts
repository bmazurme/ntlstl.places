/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

import CardTag from '../models/card-tag.model';

type User = { id: number; };

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

export const deleteCardTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardTagId } = req.params;
    const { id: userId } = (req as Request & { user: User }).user;

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+cardTagId)) {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    const cardTag = await CardTag.findOne({ where: { id: cardTagId } });

    if (!cardTag) {
      return new NotFoundError('tag was not find');
    }

    await CardTag.destroy({ where: { id: cardTagId } });

    return res.status(200).send({ message: 'link was deleted', id: cardTag });
  } catch (err) {
    next(err);
  }
};

export const updateCardTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardTagId } = req.params;
    const { cardId, tagId } = req.body;
    const { id: userId } = (req as Request & { user: User }).user;

    if (userId !== 1) {
      return next(new ForbiddenError('access denied'));
    }

    if (Number.isNaN(+cardTagId)) {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    const cardTag = await CardTag.findOne({ where: { id: cardTagId } });

    if (!cardTag) {
      return new NotFoundError('card was not found');
    }

    await cardTag.update({ cardId, tagId });

    return res.status(200).send(cardTag);
  } catch (err) {
    next(err);
  }
};
