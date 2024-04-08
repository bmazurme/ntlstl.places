import { Router } from 'express';

import { getCards, getCardsByTag, getCardsByUser } from '../controllers/card.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.CARDS.INDEX, getCards);
router.get(UrlsApi.CARDS.USER, getCardsByUser);
router.get(UrlsApi.CARDS.TAG, getCardsByTag);

export default router;
