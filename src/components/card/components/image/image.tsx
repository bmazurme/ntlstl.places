import React from 'react';

import { useAppDispatch } from '../../../../hooks';
import { setCard } from '../../../../store';

import style from './image.module.css';

export default function Image({ card }: { card: Card; }) {
  const dispatch = useAppDispatch();

  return (
    <img
      className={style.image}
      alt={card.name}
      src={`/api/files/${card.link}`}
      onClick={() => dispatch(setCard(card))}
      aria-hidden="true"
      loading="lazy"
    />
  );
}
