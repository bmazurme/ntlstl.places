import { Router } from 'express';

import { createTag, getTags, bindCardAndTag } from '../controllers/tag.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.TAGS.INDEX, createTag);
router.put(UrlsApi.TAGS.INDEX, bindCardAndTag);
router.get(UrlsApi.TAGS.INDEX, getTags);

export default router;
