/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

import { NotFoundError, BadRequestError } from '../errors/index';

import User from '../models/user.model';

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const cards = (await User.findAll()).reverse();

    return res.status(200).send(cards);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export const updateAvatar = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne(
      { where: { id: (req as & { user: User }).user.id } },
    );
    if (!user) {
      return next(new NotFoundError('пользователь не найден'));
    }
    const tempPath = req.files[0].path;
    const uniqName = `user_${user.id}_${uuidv4()}.webp`.toLowerCase();
    const targetPath = path.join('uploads', 'avatars', uniqName);

    await sharp(tempPath)
      .resize({
        width: 240,
        height: 240,
      })
      .toFormat('webp')
      .toFile(targetPath);

    fs.unlink(tempPath, (err) => {
      if (err) {
        next(err);
      }
    });

    fs.unlink(`uploads/avatars/${user.avatar}`, (err) => {
      if (err) {
        next(err);
      }
    });

    await user?.update({ avatar: uniqName });

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export const updateUser = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { name, about } = (req as Request).body;
    const user = await User.findOne(
      { where: { id: (req as & { user: User }).user.id } },
    );

    if (!user) {
      return next(new NotFoundError('пользователь не найден'));
    }

    await user.update({ name, about });

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      return next(new BadRequestError());
    }

    next(err);
  }
};
