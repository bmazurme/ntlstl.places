import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import { BASE_API_URL, Urls } from '../../utils/constants';

import style from './user.module.css';

export default function User({ user }: { user: User }) {
  return (
    <li className={style.item} key={uuidv4()}>
      <Link to={`${Urls.USER.INDEX}/${user.id}`} className={style.link}>
        <img
          className={style.avatar}
          alt={user.name}
          src={`${BASE_API_URL}/files/avatar/${user.avatar}`}
          height="50px"
          width="50px"
        />
        <span className={style.name}>
          {user.name}
        </span>
      </Link>
    </li>
  );
}
