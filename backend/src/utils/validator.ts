import { celebrate, Joi } from 'celebrate';

const reg = /^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

export const validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(reg).required(),
  }),
});

export const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateRegistrData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(reg),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateAvatarData = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(reg).required(),
  }),
});

export const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
