import { Router } from 'express';
import multer from 'multer';

import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  updateCard,
} from '../controllers/card.controller';
import { UrlsApi } from '../utils/routers';
import { updateFiles } from '../controllers/file.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(UrlsApi.CARDS.INDEX, upload.array('files'), createCard);
router.delete(UrlsApi.CARDS.ID, deleteCard);
router.patch(UrlsApi.CARDS.ID, updateCard);
router.put(UrlsApi.CARDS.LIKES, likeCard);
router.delete(UrlsApi.CARDS.LIKES, dislikeCard);
router.post(UrlsApi.FILES.UPDATE, updateFiles);

export default router;
