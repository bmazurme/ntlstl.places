import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../image';
import LikeButton from '../like-button';

import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from './card.module.css';

export default function Card({ card, index }: { card: Card; index: number; }) {
  const user = useUser();

  return (
    <div className={style.card}>
      <Image card={card} index={index} />
      <div className={style.group}>
        <div className={style.box}>
          <h2 className={style.name}>{card.name}</h2>
          <Link to={`${Urls.USERS.INDEX}/${card.user_id}`} className={style.user}>
            {card.user.name}
          </Link>
        </div>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
