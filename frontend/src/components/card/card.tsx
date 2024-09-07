import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../image';
import LikeButton from '../like-button';

import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from './card.module.css';

type CardType = { card: Card; index: number; };

export default function Card({ card, index }: CardType) {
  const user = useUser();

  return (
    <div className={style.card}>
      <Image card={card} index={index} />
      <div className={style.group}>
        <div className={style.box}>
          <h2 className={style.name}>{card.name}</h2>
          <Link to={`${Urls.USER.INDEX}/${card.userid}`} className={style.user}>
            {card.username}
          </Link>
        </div>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
