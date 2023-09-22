import { Router } from 'express';
import multer from 'multer';

import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getLikes,
} from '../../controllers/card-controller';
import { UrlsApi } from '../../utils/routers';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(UrlsApi.CARDS.INDEX, upload.array('files'), createCard);
router.delete(UrlsApi.CARDS.ID, deleteCard);
router.get(UrlsApi.CARDS.LIKES_ID, getLikes);
router.put(UrlsApi.CARDS.LIKES, likeCard);
router.delete(UrlsApi.CARDS.LIKES, dislikeCard);

export default router;
