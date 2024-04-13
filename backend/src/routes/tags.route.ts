import { Router } from 'express';

import {
  createTag, getTags, updateTag, deleteTag,
} from '../controllers/tag.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.TAGS.INDEX, createTag);
router.get(UrlsApi.TAGS.INDEX, getTags);
router.patch(UrlsApi.TAGS.ID, updateTag);
router.delete(UrlsApi.TAGS.ID, deleteTag);

export default router;
