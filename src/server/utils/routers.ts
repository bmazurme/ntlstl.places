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
    LIKES: '/cards/:id/likes',
    LIKES_ID: '/cards/likes/:id',
    USER: '/cards/user/:id',
  },
  FILES: {
    INDEX: '/files/:filename',
    AVATAR: '/files/avatar/:filename',
    COVERS: '/files/covers/:filename',
  },
};
