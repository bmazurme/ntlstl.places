import React from 'react';

import type { PropsWithChildren } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Button from '../button';
import Header from '../header';
import Footer from '../footer';

import style from './error-boundary.module.css';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={style.content}>
      <Header />
      <div className={style.boundary}>
        <div className={style.title}>
          <h2 className={style.title}>APP-ERROR</h2>
          <p className={style.message}>{error.message}</p>
          <div className={style.block}>
            Try to
            <Button className={style.button} onClick={resetErrorBoundary} variant="outline">
              Reload app
            </Button>
            or
            <Button
              className={classNames('link', style.link)}
              onClick={resetErrorBoundary}
              variant="outline"
              as={Link}
              to="/"
            >
              Go to homepage
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ErrorBoundaryWrapper({
  children,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary onReset={() => console.log('reset')} FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
