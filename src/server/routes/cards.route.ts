import { Router } from 'express';

import { getCards } from '../controllers/card.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.CARDS.INDEX, getCards);

export default router;
