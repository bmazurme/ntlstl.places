import React from 'react';
import type { PropsWithChildren } from 'react';

import { Title } from '../../ui';

import style from './board.module.css';

type BoardType = PropsWithChildren & { title?: string; };

export default function Board({ children, title }: BoardType) {
  return (
    <div className={style.container}>
      {title && <Title text={title} />}
      {children}
    </div>
  );
}
