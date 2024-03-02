import { Router } from 'express';
import multer from 'multer';
import SharpMulter from 'sharp-multer';

import { getUserMe } from '../controllers/auth.controller';
import { updateAvatar, updateUser, getUsers } from '../controllers/user.controller';

import { UrlsApi } from '../utils/routers';

const router = Router();
const storage = SharpMulter({
  destination: (req: any, file: any, callback: any) => callback(null, 'uploads/avatars/'),
  imageOptions: {
    fileFormat: 'jpg',
    quality: 100,
    resize: { width: 240, height: 240 },
  },
});
const upload = multer({ storage });

router.get(UrlsApi.USER.INDEX, getUsers);
router.get(UrlsApi.USER.ME, getUserMe);
router.patch(UrlsApi.USER.ME, updateUser);
router.patch(UrlsApi.USER.AVATAR, upload.array('files'), updateAvatar);

export default router;
