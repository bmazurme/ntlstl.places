import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BASE_API_URL, Urls } from '../../utils/constants';
import style from './image.module.css';

export default function Image({ card, index }: { card: Card; index: number; }) {
  const location = useLocation();

  return (
    <Link
      to={`${Urls.CARD.CURRENT}/${card?.id}`}
      state={{ pathname: location.pathname, from: location.pathname }}
      className={style.link}
      aria-label={card.name}
    >
      <img
        className={style.image}
        alt={card.name}
        src={`${BASE_API_URL}/files/covers/${card.link}`}
        aria-hidden="true"
        loading={index > 6 ? 'lazy' : 'eager'}
        height="282px"
        width="282px"
      />
    </Link>
  );
}
