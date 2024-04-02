import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import Preloader from '../../components/preloader';

import { useSignInWitOauthYaMutation } from '../../store/api';
import { useAppLocation } from '../../hooks/use-app-location';

import { Urls } from '../../utils/constants';

import style from './oauth-layout.module.css';

export default function Oauth() {
  const location = useAppLocation();
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
          navigate(location?.state?.from || Urls.BASE); // ref oauth to api
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
