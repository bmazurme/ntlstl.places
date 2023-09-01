/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors';

import Card from '../../models/card-model';
import { IUser } from '../../models/user-model';

const createCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { name, link } = (req as Request).body;
    const card = await Card.create({ name, link, userId: (req as & { user: IUser}).user._id });

    return res.status(200).send(card);
  } catch (error: unknown) {
    if ((error as Error).name === 'ValidationError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

const deleteCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById((req as Request).params.id);

    if (!card) {
      return new NotFoundError('карточка не найдена');
    }

    if (!card.userId.equals((req as Request & { user: IUser}).user._id)) {
      next(new ForbiddenError('access denied'));
    }

    await Card.deleteOne({ _id: (req as Request).params.id });

    return res.status(200).send({ message: 'карточка удалена' });
  } catch (err) {
    next(err);
  }
};

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = (await Card.find({})).reverse();

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      (req as Request).params.id,
      { $addToSet: { likes: (req as Request & { user: IUser }).user._id } },
      { new: true },
    );

    if (!card) {
      next(new NotFoundError('карточка не найдена'));
    }

    return res.status(200).send(card);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

const dislikeCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      (req as Request).params.id,
      { $pull: { likes: (req as Request & { user: User }).user._id } },
      { new: true },
    );

    if (!card) {
      next(new NotFoundError('карточка не найдена'));
    }

    return res.status(200).send(card);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

export {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
};
