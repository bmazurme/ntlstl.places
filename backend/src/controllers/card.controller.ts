/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { QueryTypes } from 'sequelize';
import { BadRequestError, NotFoundError, ForbiddenError } from '../errors';

import User from '../models/user.model';
import Card from '../models/card.model';
import Like from '../models/like.model';
import Tag from '../models/tag.model';
import CardTag from '../models/card-tag.model';

export const createCard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, tagName } = req.body;
    const tag = await Tag.findOne({ where: { name: tagName } });
    let tagId = null;

    if (!tag) {
      const { id } = await Tag.create({ name: tagName });
      tagId = id;
    } else {
      tagId = tag.id;
    }

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

    const user = await User.findOne({
      where: { id: (req as & { user: User }).user.id },
    });

    const card = await Card.create({
      ...req.files[0],
      name,
      link: uniqName,
      user_id: (req as & { user: User }).user.id,
    });

    if (tagId) {
      await CardTag.create({ cardId: card.id, tagId });
    }

    return res.send({
      id: card.id, name: card.name, link: card.link, userid: user?.id, username: user?.name,
    });
  } catch (error: unknown) {
    if ((error as Error).name === 'ValidationError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(+id)) {
      return next(new BadRequestError('bad request'));
    }

    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return new NotFoundError('card was not found');
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

    return res.status(200).send({ message: 'card was deleted', id: (req as Request).params.id });
  } catch (err) {
    next(err);
  }
};

export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ where: { id: req.params.id } });
    const { name } = req.body;

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

export const getCardsByPage = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const currentUser = (req as any).user?.id || -1;

  if (Number.isNaN(+id)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const page = (Number(id) - 1) * 3 || 0;
    const cards = await Card.sequelize?.query(`
    SELECT t.id, t.name, t.link, t.user_id userId, t.count::int, t.isLiked, u.name userName
    FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${currentUser}) as isLiked
          FROM cards c
          LEFT JOIN likes l ON c.id = l.card_id
          GROUP BY c.id) t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC
    OFFSET ${page} ROWS
    FETCH NEXT 3 ROWS ONLY`, { type: QueryTypes.SELECT });

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardsByUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, pageId } = req.params;
  const currentUser = (req as Request & { user: User }).user.id || -1;

  if (Number.isNaN(+userId) || Number.isNaN(+pageId)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const page = (Number(pageId) - 1) * 3;
    const cards = await Card.sequelize?.query(`
    SELECT t.id, t.name, t.link, t.user_id userId, t.count::int, t.isLiked, u.name userName
    FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${currentUser}) as isLiked
          FROM cards c
          LEFT JOIN likes l ON c.id = l.card_id
          WHERE c.user_id = ${userId}
          GROUP BY c.id) t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC
    OFFSET ${page} ROWS
    FETCH NEXT 3 ROWS ONLY`, { type: QueryTypes.SELECT });

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardsByTag = async (req: Request, res: Response, next: NextFunction) => {
  const { tagName, pageId } = req.params;
  const { id: userId } = (req as Request & { user: User }).user;

  if (!tagName || Number.isNaN(+pageId)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const page = (Number(pageId) - 1) * 3;
    const cards = await Card.sequelize?.query(`
    SELECT rslt.id, rslt.name, rslt.link, rslt.user_id userid, rslt.count::int, rslt.liked isliked, rslt.userName, rslt.tagsname tagsname
    FROM (SELECT tt.id, tt.name, tt.link, tt.user_id, tt.count::int, tt.liked, tt.userName, tt.tagid, tags.name tagsname
          FROM (SELECT t.id, t.name, t.link, t.user_id, t.count::int, t.liked, u.name userName, tg."tagId" tagid
                FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${userId}) as liked
                      FROM cards c
                      LEFT JOIN likes l ON c.id = l.card_id
                      GROUP BY c.id) t
                LEFT JOIN users u ON t.user_id = u.id
                LEFT JOIN "cardTags" tg ON t.id = tg."cardId") tt
          LEFT JOIN tags ON tt.tagid = tags.id) rslt
    WHERE tagsname = '${tagName}'
    ORDER BY rslt.id DESC
    OFFSET ${page} ROWS
    FETCH NEXT 3 ROWS ONLY`, { type: QueryTypes.SELECT });

    return res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = (req as Request & { user: User }).user;
  const { id: cardId } = req.params;

  if (Number.isNaN(+cardId)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const card = await Card.sequelize?.query(`
    SELECT t.id, t.name, t.link, t.user_id userId, t.count::int, t.isLiked, u.name userName
    FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${userId}) as isLiked
          FROM cards c
          LEFT JOIN likes l ON c.id = l.card_id
          WHERE c.id = ${cardId}
          GROUP BY c.id) t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC`, { type: QueryTypes.SELECT });

    if (!card || !card[0]) {
      return next(new NotFoundError('card was not found'));
    }

    return res.status(200).send(...card);
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = (req as Request & { user: User }).user;
  const { id: cardId } = req.params;

  if (Number.isNaN(+cardId)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const { card_id } = await Like.create(
      {
        card_id: Number(cardId),
        user_id: Number(userId),
      },
    );

    const card = await Card.sequelize?.query(`
    SELECT t.id, t.name, t.link, t.user_id userId, t.count::int, t.isLiked, u.name userName
    FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${userId}) as isLiked
          FROM cards c
          LEFT JOIN likes l ON c.id = l.card_id
          WHERE c.id = ${card_id}
          GROUP BY c.id) t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC`, { type: QueryTypes.SELECT });

    if (!card) {
      return next(new NotFoundError('card was not found'));
    }

    return res.status(201).send(...card);
  } catch (error: unknown) {
    if ((error as Error).name === 'SequelizeForeignKeyConstraintError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = (req as Request & { user: User }).user;
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const like = await Like.destroy({
      where: {
        card_id: Number(id),
        user_id: Number((req as Request & { user: User }).user.id),
      },
    });

    if (!like) {
      return next(new NotFoundError('like was not found'));
    }

    const card = await Card.sequelize?.query(`
    SELECT t.id, t.name, t.link, t.user_id userId, t.count::int, t.isLiked, u.name userName
    FROM (SELECT c.id, c.name, c.link, c.user_id, COUNT(l.card_id) as count, bool_or(l.user_id = ${userId}) as isLiked
          FROM cards c
          LEFT JOIN likes l ON c.id = l.card_id
          WHERE c.id = ${req.params.id}
          GROUP BY c.id) t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC`, { type: QueryTypes.SELECT });

    if (!card) {
      return next(new NotFoundError('caed was not find'));
    }

    return res.status(201).send(...card);
  } catch (error) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};

export const getCardCount = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  if (Number.isNaN(+userId)) {
    return next(new BadRequestError('bad request'));
  }

  try {
    const cards = await Card.findAll({ where: { user_id: userId } });

    return res.status(201).send({ count: cards.length });
  } catch (error: unknown) {
    if ((error as Error).name === 'CastError') {
      return next(new BadRequestError('bad request'));
    }

    next(error);
  }
};
