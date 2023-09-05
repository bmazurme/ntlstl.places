/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors';

import Card from '../../models/card-model';
import { IUser } from '../../models/user-model';

const createCard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name } = (req as Request).body;
    const tempPath = req.files[0].path;
    const uniqName = `${uuidv4()}_${req.files[0].originalname}`.toLowerCase();
    const targetPath = path.join('uploads', uniqName);
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        console.log('err');
      }
    });

    const card = await Card.create({
      ...req.files[0],
      name,
      link: uniqName,
      userId: (req as & { user: IUser}).user._id,
    });

    return res.send(card);
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

    const targetPath = path.join(__dirname, '..', 'uploads', card.link);
    fs.unlink(targetPath, (err) => {
      if (err) {
        next(err);
      }
    });
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
