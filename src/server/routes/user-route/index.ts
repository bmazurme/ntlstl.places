import { Router } from 'express';

import { getUserMe } from '../../controllers/auth-controller';
import { updateAvatar, updateUser } from '../../controllers/user-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.USER.ME, getUserMe);
router.patch(UrlsApi.USER.ME, updateUser);
router.patch(UrlsApi.USER.AVATAR, updateAvatar);

export default router;
