import { Router } from 'express';

import {
  createUserRole, deleteUserRole, getUserRoles, updateUserRole,
} from '../controllers/user-role.controller';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.get(UrlsApi.USER_ROLES.INDEX, getUserRoles);
router.post(UrlsApi.USER_ROLES.INDEX, createUserRole);
router.patch(UrlsApi.USER_ROLES.ID, updateUserRole);
router.delete(UrlsApi.USER_ROLES.ID, deleteUserRole);

export default router;
