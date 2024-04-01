import React from 'react';

import { useAppDispatch } from '../../hooks';
import { setCard } from '../../store';

import { BASE_API_URL } from '../../utils/constants';

import style from './image.module.css';

export default function Image({ card, index }: { card: Card; index: number; }) {
  const dispatch = useAppDispatch();

  return (
    <img
      className={style.image}
      alt={card.name}
      src={`${BASE_API_URL}/files/covers/${card.link}`}
      onClick={() => dispatch(setCard(card))}
      aria-hidden="true"
      loading={index > 6 ? 'lazy' : 'eager'}
      height="282px"
      width="282px"
    />
  );
}
