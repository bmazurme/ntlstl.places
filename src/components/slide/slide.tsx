import React from 'react';

import { useAppSelector } from '../../hooks';
import { cardSelector } from '../../store';

import style from './slide.module.css';

export default function Slide() {
  const card = useAppSelector(cardSelector);

  return (
    <div className={style.slide}>
      <img src={`/api/files/${card?.link}` ?? ''} alt={card?.name ?? ''} className={style.image} />
      <p className={style.name}>{card?.name ?? ''}</p>
    </div>
  );
}
