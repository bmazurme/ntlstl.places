import { Router } from 'express';

import { getLikes } from '../../controllers/like-controller';
import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.CARDS.LIKES_ID, getLikes);

export default router;
