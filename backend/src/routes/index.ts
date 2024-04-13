import { Router } from 'express';

import authRoute from './auth.route';
import oauthRoute from './oauth.route';
import userRoute from './users.route';
import cardsRoute from './cards.route';
import cardRoute from './card.route';
import fileRoute from './files.route';
import tagRoute from './tags.route';
import cardTagRoute from './card-tags.route';

import authMiddleware from '../middlewares/auth-middleware';
import userMiddleware from '../middlewares/user-middleware';

const router = Router();

router.use(authRoute);
router.use(oauthRoute);
router.use(userMiddleware, cardsRoute);
router.use(fileRoute);
router.use(authMiddleware, cardRoute); // move to component
router.use(authMiddleware, userRoute); // move to component
router.use(authMiddleware, tagRoute); // move to component
router.use(authMiddleware, cardTagRoute); // move to component

export default router;
