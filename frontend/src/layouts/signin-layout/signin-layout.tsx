import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/use-user';
import { YA_ENDPOINT } from '../../utils/constants';

import yaOauth from '../../images/ya-oauth.svg';

import style from './signin-layout.module.css';

export default function SigninLayout() {
  const navigate = useNavigate();
  const userData = useUser();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  return (
    <div className={style.layout}>
      <h2 className={style.title}>Sign In</h2>
      <div className={style.form}>
        <a href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${YA_ENDPOINT}`}>
          <img src={yaOauth} alt="Sign in with Yandex ID" />
        </a>
      </div>
    </div>
  );
}
