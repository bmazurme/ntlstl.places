import { Router } from 'express';

import { getFile, getAvatarFile, getCoverFile } from '../controllers/file.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.FILES.INDEX, getFile);
router.get(UrlsApi.FILES.AVATAR, getAvatarFile);
router.get(UrlsApi.FILES.COVERS, getCoverFile);

export default router;
