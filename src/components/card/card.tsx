import React from 'react';

import Image from './components/image';
import LikeButton from './components/like-button';
import RemoveButton from './components/remove-button';

import useUser from '../../hooks/use-user';

import style from './card.module.css';

export default function Card({ card }: { card: Card; }) {
  const user = useUser();

  return (
    <div className={style.card}>
      {user && <RemoveButton card={card} user={user} />}
      <Image card={card} />
      <div className={style.group}>
        <h2 className={style.name}>{card.name}</h2>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
