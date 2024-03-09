import { Router } from 'express';

import { getCards, getCardsByUser } from '../controllers/card.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.CARDS.INDEX, getCards);
router.get(UrlsApi.CARDS.USER, getCardsByUser);

export default router;
