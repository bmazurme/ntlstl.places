import React from 'react';
import type { PropsWithChildren } from 'react';

import Title from '../title';

import style from './board.module.css';

export default function Board({ children, title }: PropsWithChildren & { title?: string; }) {
  return (
    <div className={style.container}>
      {title && <Title text={title} />}
      {children}
    </div>
  );
}
