import { Router } from 'express';

import {
  createRole, getRoles, updateRole, deleteRole,
} from '../controllers/role.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.post(UrlsApi.ROLES.INDEX, createRole);
router.get(UrlsApi.ROLES.INDEX, getRoles);
router.patch(UrlsApi.ROLES.ID, updateRole);
router.delete(UrlsApi.ROLES.ID, deleteRole);

export default router;
