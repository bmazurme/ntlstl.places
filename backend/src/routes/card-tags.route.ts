import { Router } from 'express';

import {
  bindCardAndTag, deleteCardTag, updateCardTag,
} from '../controllers/card-tag.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.CARD_TAGS.INDEX, bindCardAndTag);
router.patch(UrlsApi.CARD_TAGS.ID, updateCardTag);
router.delete(UrlsApi.CARD_TAGS.ID, deleteCardTag);

export default router;
