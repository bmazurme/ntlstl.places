/* eslint-disable max-len */
import React, { useState } from 'react';

import { AvatarButton, PlusButton, ProfileButton } from './components';
import { userCardsSelector } from '../../store';

import useUser from '../../hooks/use-user';
import { useAppSelector } from '../../hooks';

import style from './profile.module.css';

export default function Profile({ currentUser }: { currentUser: User; }) {
  const user = useUser();
  const cards = useAppSelector(userCardsSelector);
  const [popup, setPopup] = useState({ profile: false, avatar: false, place: false });

  return (
    <section className={style.profile}>
      <AvatarButton
        info={user}
        popup={popup}
        setPopup={setPopup}
        currentUser={currentUser}
      />
      <div className={style.info}>
        <h2 className={style.name}>{currentUser?.name}</h2>
        <p className={style.profession}>{currentUser?.about}</p>
        <p className={style.count}>{`Posts: ${cards.length}`}</p>
        {currentUser?.id === user?.id && <ProfileButton info={currentUser} popup={popup} setPopup={setPopup} />}
      </div>
      {user?.id === 1 && <PlusButton popup={popup} setPopup={setPopup} />}
    </section>
  );
}
