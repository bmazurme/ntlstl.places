/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import path from 'path';

import { BadRequestError, NotFoundError } from '../errors';

import Card from '../models/card.model';

export const getFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { link: req.params.filename } });

    if (!card) {
      return next(new NotFoundError('File not found'));
    }

    res.sendFile(path.join(__dirname, '..', 'uploads', card.link));
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};
