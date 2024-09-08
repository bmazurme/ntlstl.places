/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { BadRequestError, NotFoundError } from '../errors';

import Card from '../models/card.model';
import User from '../models/user.model';

export const getFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { link: req.params.filename } });

    if (!card) {
      return next(new NotFoundError('File not found'));
    }
    res
      // .setHeader('Cache-Control', 'public, max-age=86400')
      .sendFile(path.join(__dirname, '..', '..', 'uploads', 'slides', card.link));
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getCoverFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { link: req.params.filename } });

    if (!card) {
      return next(new NotFoundError('File not found'));
    }

    res
      .setHeader('Cache-Control', 'public, max-age=86400')
      .sendFile(path.join(__dirname, '..', '..', 'uploads', 'covers', card.link));
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getAvatarFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ where: { avatar: req.params.filename } });

    if (!user) {
      return next(new NotFoundError('File not found'));
    }

    res.set('Cache-Control', 'public, max-age=31557600').sendFile(path.join(__dirname, '..', '..', 'uploads', 'avatars', user.avatar));
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const updateFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const folderCovers = path.join(__dirname, '..', '..', 'uploads', 'covers');
    const folderSlides = path.join(__dirname, '..', '..', 'uploads', 'slides');

    if (!fs.existsSync(folderCovers)) {
      fs.mkdirSync(folderCovers);
    }

    if (!fs.existsSync(folderSlides)) {
      fs.mkdirSync(folderSlides);
    }

    const cards = await Card.findAll({});
    cards.forEach(async (card) => {
      const srcCover = path.join(__dirname, '..', '..', 'uploads', card.link);
      const cover = path.join(folderCovers, card.link);
      const slide = path.join(folderSlides, card.link);

      await sharp(srcCover)
        .resize(564, 564)
        .toFile(cover);
      await sharp(srcCover)
        .resize(1000, 1000)
        .toFile(slide);
    });

    return res.send({ message: 'ok' });
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};
