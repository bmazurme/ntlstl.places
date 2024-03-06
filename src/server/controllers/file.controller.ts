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

    const readableStream = fs.createReadStream(path.join(__dirname, '..', 'uploads', card.link));
    const transform = sharp()
      .resize(1000, 1000)
      .on('info', (info) => console.log('=>', info));

    readableStream.pipe(transform).pipe(res);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
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

    const readableStream = fs.createReadStream(path.join(__dirname, '..', 'uploads', card.link));
    const transform = sharp()
      .resize(564, 564)
      .on('info', (info) => console.log('=>', info));

    readableStream.pipe(transform).pipe(res);
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
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

    res.sendFile(path.join(__dirname, '..', 'uploads', 'avatars', user.avatar));
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    next(error);
  }
};
