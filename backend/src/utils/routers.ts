export const UrlsApi = {
  SIGN: {
    OAUTH: '/oauth',
    OUT: '/logout',
  },
  USER: {
    INDEX: '/users',
    ME: '/users/me',
    ID: '/users/:id',
    AVATAR: '/users/me/avatar',
  },
  CARDS: {
    INDEX: '/cards',
    ID: '/cards/:id',
    PAGE: '/cards/page/:id',
    LIKES: '/cards/:id/likes',
    LIKES_ID: '/cards/likes/:id',
    USER: '/cards/user/:userId/page/:pageId',
    TAG: '/cards/tag/:tagName/page/:pageId',
    COUNT: '/cards/count/:userId',
  },
  FILES: {
    INDEX: '/files/:filename',
    AVATAR: '/files/avatar/:filename',
    COVERS: '/files/covers/:filename',
    UPDATE: '/files',
  },
  TAGS: {
    INDEX: '/tags',
    ID: '/tags/:id',
  },
  ROLES: {
    INDEX: '/roles',
    ID: '/roles/:id',
  },
  CARD_TAGS: {
    INDEX: '/card-tags',
    ID: '/card-tags/:id',
  },
  USER_ROLES: {
    INDEX: '/user-roles',
    ID: '/user-roles/:id',
  },
};
