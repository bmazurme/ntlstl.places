/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors';

import Card from '../../models/card-model';
import Like from '../../models/like-model';

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
      user_id: (req as & { user: User}).user.id,
    });

    return res.send(card);
  } catch (error: unknown) {
    if ((error as Error).name === 'ValidationError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { id: req.params.id } });

    if (!card) {
      return new NotFoundError('карточка не найдена');
    }

    if (card.user_id !== Number((req as Request & { user: User }).user.id)) {
      next(new ForbiddenError('access denied'));
    }

    const targetPath = path.join(__dirname, '..', 'uploads', card.link);

    fs.unlink(targetPath, (err) => {
      if (err) {
        next(err);
      }
    });

    await Card.destroy({ where: { id: (req as Request).params.id } });

    return res.status(200).send({ message: 'карточка удалена' });
  } catch (err) {
    next(err);
  }
};

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = (await Card.findAll()).reverse();

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await Like.create(
      {
        card_id: Number(req.params.id),
        user_id: Number((req as Request & { user: User }).user.id),
      },
    );

    return res.status(201).send(like);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await Like.destroy({
      where: {
        card_id: Number(req.params.id),
        user_id: Number((req as Request & { user: User }).user.id),
      },
    });

    if (!like) {
      next(new NotFoundError('карточка не найдена'));
    }

    return res.sendStatus(200);
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
