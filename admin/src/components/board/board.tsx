import type { PropsWithChildren } from 'react';

import { Typography } from '@mui/material';

import style from './board.module.css';

type BoardType = PropsWithChildren & { title?: string; };

export default function Board({ children, title }: BoardType) {
  return (
    <div className={style.container}>
      {title && <Typography>{title}</Typography>}
      {children}
    </div>
  );
}
