/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/user.model';

const oauthYaSigninController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    const { CLIENT_ID = '', CLIENT_SECRET = '', DEV_JWT_SECRET = 'DEV_JWT_SECRET' } = process.env;

    const formdata = new FormData();
    formdata.append('code', code);
    formdata.append('client_id', CLIENT_ID);
    formdata.append('client_secret', CLIENT_SECRET);
    formdata.append('grant_type', 'authorization_code');
    const options: RequestInit = { method: 'POST', body: formdata, redirect: 'follow' };
    const rlst = await fetch('https://oauth.yandex.ru/token', options);

    const rs = await rlst.json();
    const { access_token: token } = rs;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'follow',
    };
    const response = await fetch('https://login.yandex.ru/info', requestOptions);

    if (response.ok) {
      const { default_email } = await response.json();

      let user = await User.findOne({
        where: { email: default_email },
      });

      if (!user) {
        user = await User.create({
          email: default_email,
          name: 'User',
          about: 'guest',
          avatar: 'https://www.ejin.ru/wp-content/uploads/2019/05/zakat-zimoj-na-gore.jpg',
        });
      }

      const tokenNew = jwt.sign(
        { default_email, id: user.id },
        DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.status(200).cookie('token', tokenNew, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send(user);
    }

    return res.send({ message: 'error' });
  } catch (err) {
    next(err);
  }
};

export { oauthYaSigninController };
