import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/use-user';
import yaOauth from '../../images/ya-oauth.svg';

import style from './signin-layout.module.css';

// const link = 'https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f';
const link = document.cookie === 'mode='
  ? 'https://oauth.yandex.ru/authorize?response_type=code&client_id=131fd54e2cb047f78ae10e63a1caf0e2'
  : 'https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f';

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
        <a href={link}>
          <img src={yaOauth} alt="Sign in with Yandex ID" />
        </a>
      </div>
    </div>
  );
}
