import React from 'react';
import type { PropsWithChildren } from 'react';

import Header from '../header';
import Footer from '../footer';

import style from './content.module.css';

export default function Content({ children }: PropsWithChildren) {
  return (
    <main className={style.content}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
