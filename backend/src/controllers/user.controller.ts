/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { NotFoundError, BadRequestError } from '../errors/index';

import User from '../models/user.model';

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['email', 'createdAt', 'updatedAt'] },
    });

    return res.status(200).send(users);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['email', 'createdAt', 'updatedAt'] },
    });

    if (!user) {
      return next(new NotFoundError('пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err: unknown) {
    if ((err as Error).name === 'CastError') {
      next(new BadRequestError());
    }

    next(err);
  }
};

export const updateAvatar = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: { id: (req as & { user: User }).user.id },
      attributes: { exclude: ['email', 'createdAt', 'updatedAt'] },
    });

    if (!user) {
      return next(new NotFoundError('пользователь не найден'));
    }
    const tempPath = req.files[0].path;
    const uniqName = `user_${user.id}_${uuidv4()}.webp`.toLowerCase();
    const targetPath = path.join(__dirname, '..', '..', 'uploads', 'avatars', uniqName);

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

    fs.unlink(path.join(__dirname, '..', '..', 'uploads', 'avatars', user.avatar), (err) => {
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
