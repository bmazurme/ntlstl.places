import { Router } from 'express';

import { getFile } from '../../controllers/file-controller';

import { UrlsApi } from '../../utils/routers';

const router = Router();

router.get(UrlsApi.FILES.INDEX, getFile);

export default router;
