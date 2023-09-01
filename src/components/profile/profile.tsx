import React, { useState } from 'react';

import { AvatarButton, PlusButton, ProfileButton } from './components';

import useUser from '../../hooks/use-user';
import { ADMIN } from '../../utils/constants';

import style from './profile.module.css';

export default function Profile() {
  const user = useUser();
  const [popup, setPopup] = useState({ profile: false, avatar: false, place: false });

  return (
    <section className={style.profile}>
      <AvatarButton info={user} popup={popup} setPopup={setPopup} />
      <div className={style.info}>
        <h2 className={style.name}>{user?.name}</h2>
        <p className={style.profession}>{user?.about}</p>
        <ProfileButton info={user} popup={popup} setPopup={setPopup} />
      </div>
      {user?.defaultEmail === ADMIN && <PlusButton popup={popup} setPopup={setPopup} />}
    </section>
  );
}
