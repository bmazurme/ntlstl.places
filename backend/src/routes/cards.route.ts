import { Router } from 'express';

import {
  getCardsByTag, getCardsByUser, getCardsByPage, getCardCount,
} from '../controllers/card.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.CARDS.PAGE, getCardsByPage);
router.get(UrlsApi.CARDS.USER, getCardsByUser);
router.get(UrlsApi.CARDS.TAG, getCardsByTag);
router.get(UrlsApi.CARDS.COUNT, getCardCount);

export default router;
