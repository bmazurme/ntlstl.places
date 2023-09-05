import { Router } from 'express';
import multer from 'multer';

import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../../controllers/card-controller';
import { validateObjectId } from '../../utils/validator';
// validateCardData,
import { UrlsApi } from '../../utils/routers';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(UrlsApi.CARDS.INDEX, upload.array('files'), createCard);

router.delete(UrlsApi.CARDS.ID, validateObjectId, deleteCard);
router.put(UrlsApi.CARDS.LIKES, validateObjectId, likeCard);
router.delete(UrlsApi.CARDS.LIKES, validateObjectId, dislikeCard);

export default router;
