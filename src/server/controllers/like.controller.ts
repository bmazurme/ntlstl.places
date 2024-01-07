/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors';

import Like from '../models/like.model';

const getLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likes = await Like.findAll(
      { where: { card_id: req.params.id } },
    );

    return res.status(201).send(likes);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

export { getLikes };
