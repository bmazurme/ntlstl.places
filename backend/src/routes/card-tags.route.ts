import { Router } from 'express';

import {
  bindCardAndTag, deleteCardTag, getCardTags, updateCardTag,
} from '../controllers/card-tag.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.CARD_TAGS.INDEX, getCardTags);
router.post(UrlsApi.CARD_TAGS.INDEX, bindCardAndTag);
router.patch(UrlsApi.CARD_TAGS.ID, updateCardTag);
router.delete(UrlsApi.CARD_TAGS.ID, deleteCardTag);

export default router;
