/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestError, NotFoundError, ForbiddenError } from '../errors';

import User from '../models/user.model';
import Card from '../models/card.model';
import Like from '../models/like.model';

export const createCard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name } = (req as Request).body;
    const tempPath = req.files[0].path;
    const fileName = req.files[0].originalname;
    const uniqName = `${uuidv4()}_${fileName.replace(fileName.split('.')[fileName.split('.').length - 1], 'webp')}`.toLowerCase();
    const targetPath = path.join('uploads', uniqName);
    const folderCovers = path.join(__dirname, '..', '..', 'uploads', 'covers');
    const folderSlides = path.join(__dirname, '..', '..', 'uploads', 'slides');
    const cover = path.join(folderCovers, uniqName);
    const slide = path.join(folderSlides, uniqName);

    await sharp(tempPath)
      .toFormat('webp')
      .toFile(targetPath);
    await sharp(tempPath)
      .toFormat('webp')
      .resize(564, 564)
      .toFile(cover);
    await sharp(tempPath)
      .toFormat('webp')
      .resize(1000, 1000)
      .toFile(slide);

    fs.unlink(tempPath, (err) => {
      if (err) {
        next(err);
      }
    });

    fs.unlink(tempPath, (err) => {
      if (err) {
        next(err);
      }
    });

    const card = await Card.create({
      ...req.files[0],
      name,
      link: uniqName,
      user_id: (req as & { user: User }).user.id,
    });

    return res.send(card);
  } catch (error: unknown) {
    if ((error as Error).name === 'ValidationError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { id: req.params.id } });

    if (!card) {
      return new NotFoundError('карточка не найдена');
    }

    if (card.user_id !== Number((req as Request & { user: User }).user.id)) {
      return next(new ForbiddenError('access denied'));
    }

    const targetPath = path.join(__dirname, '..', '..', 'uploads', card.link);
    const covers = path.join(__dirname, '..', '..', 'uploads', 'covers', card.link);
    const slides = path.join(__dirname, '..', '..', 'uploads', 'slides', card.link);

    fs.unlink(targetPath, (err) => {
      if (err) {
        next(err);
      }
    });
    fs.unlink(covers, (err) => {
      if (err) {
        next(err);
      }
    });
    fs.unlink(slides, (err) => {
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

export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { id: req.params.id } });
    const { name } = (req as Request).body;

    if (!card) {
      return new NotFoundError('card was not found');
    }

    if (card.user_id !== Number((req as Request & { user: User }).user.id)) {
      return next(new ForbiddenError('access denied'));
    }

    await card.update({ name });

    return res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Like,
          attributes: ['user_id'],
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.findAll(
      {
        where: { user_id: req.params.id },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Like,
            attributes: ['user_id'],
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [
          ['createdAt', 'DESC'],
        ],
      },
    );

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne(
      {
        where: { id: req.params.id },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Like,
            attributes: ['user_id'],
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    );

    console.log(card);

    if (!card) {
      return next(new NotFoundError('карточка не найдена'));
    }

    return res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await Like.create(
      {
        card_id: Number(req.params.id),
        user_id: Number((req as Request & { user: User }).user.id),
      },
    );

    return res.status(201).send(like);
  } catch (error: unknown) {
    if ((error as Error).name === 'SequelizeForeignKeyConstraintError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const like = await Like.destroy({
      where: {
        card_id: Number(req.params.id),
        user_id: Number((req as Request & { user: User }).user.id),
      },
    });

    if (!like) {
      return next(new NotFoundError('card was not found'));
    }

    return res.sendStatus(200);
  } catch (error) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};
