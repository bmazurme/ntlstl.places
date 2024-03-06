import { Router } from 'express';
import multer from 'multer';

import { getUserMe } from '../controllers/auth.controller';
import { updateAvatar, updateUser, getUsers } from '../controllers/user.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();
const upload = multer({ dest: 'uploads/avatars/' });

router.get(UrlsApi.USER.INDEX, getUsers);
router.get(UrlsApi.USER.ME, getUserMe);
router.patch(UrlsApi.USER.ME, updateUser);
router.patch(UrlsApi.USER.AVATAR, upload.array('files'), updateAvatar);

export default router;
