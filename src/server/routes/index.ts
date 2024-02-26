import { Router } from 'express';

import authRoute from './auth.route';
import oauthRoute from './oauth.route';
import userRoute from './users.route';
import cardsRoute from './cards.route';
import cardRoute from './card.route';
import fileRoute from './files.route';
import likeRoute from './likes.route';

import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use(authRoute);
router.use(oauthRoute);
router.use(cardsRoute);
router.use(fileRoute);
router.use(likeRoute);
router.use(authMiddleware, cardRoute); // move to component
router.use(authMiddleware, userRoute); // move to component

export default router;
