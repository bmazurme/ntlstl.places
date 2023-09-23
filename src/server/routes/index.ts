import { Router } from 'express';

import authRoute from './auth-route';
import oauthRoute from './oauth-route';
import userRoute from './user-route';
import cardsRoute from './cards-route';
import cardRoute from './card-route';
import fileRoute from './file-route';
import likeRoute from './like-route';

import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use('/', authRoute);
router.use('/', oauthRoute);
router.use('/', cardsRoute);
router.use('/', fileRoute);
router.use('/', likeRoute);
router.use('/', authMiddleware, userRoute);
router.use('/', authMiddleware, cardRoute);

export default router;
