export const SHIFT = 30;
export const Urls = {
  BASE: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  OAUTH: {
    INDEX: '/oauth',
    YANDEX: 'https://oauth.yandex.ru',
  },
  ADMIN: {
    INDEX: '/admin',
  },
  USERS: {
    INDEX: '/users',
    CURRENT: '/user/:id',
  },
  KIT: {
    INDEX: '/kit',
  },
  404: '*',
};
export const Regexp = {
  EMAIL: '[a-z0-9._%+-]+@[a-z0-9.-]+[\\.{0}][a-z]{2,3}$',
};
export const BASE_API_URL = process.env.API_HOST;
// eslint-disable-next-line prefer-destructuring
export const YA_ENDPOINT = process.env.YA_ENDPOINT;
