import { Router } from 'express';

import { logout } from '../controllers/auth.controller';

import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.SIGN.OUT, logout);

export default router;
