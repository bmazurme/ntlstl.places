// https://oauth.yandex.ru/authorize?response_type=code&client_id=c709762dfe3e447999beb343da0bee9f
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import Preloader from '../../components/preloader';

import { useSignInWitOauthYaMutation } from '../../store/api';

import { Urls } from '../../utils/constants';

import style from './oauth-layout.module.css';

export default function Oauth() {
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const [searchParams] = useSearchParams();
  const [signInWitOauthYa, { isLoading }] = useSignInWitOauthYaMutation();
  const code = searchParams.get('code')!;

  useEffect(() => {
    const signIn = async () => {
      try {
        const { data } = await signInWitOauthYa({ code }) as unknown as { data: User};

        if (data) {
          setTimeout(() => navigate(Urls.BASE), 1000);
        }
      } catch (err) {
        errorHandler(err);
      }
    };

    signIn();
  }, [code]);

  return (
    isLoading
      ? <Preloader />
      : (
        <section className={style.layout}>
          <div className={style.container}>
            <h2 className={style.title}>Welcome!</h2>
          </div>
        </section>
      )
  );
}
