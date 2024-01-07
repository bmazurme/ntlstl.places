import { Router } from 'express';

import { oauthYaSigninController } from '../controllers/oauth.controller';

import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.SIGN.OAUTH, oauthYaSigninController);

export default router;
