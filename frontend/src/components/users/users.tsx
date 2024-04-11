import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { usersSelector } from '../../store';
import { BASE_API_URL, Urls } from '../../utils/constants';

import style from './users.module.css';

export default function Users() {
  const users = useAppSelector(usersSelector);

  return (
    <ul className={style.list}>
      {users.map((u: User, i: number) => (
        <li className={style.item} key={i}>
          <Link to={`${Urls.USERS.INDEX}/${u.id}`} className={style.link}>
            <img
              className={style.avatar}
              alt={u.name}
              src={`${BASE_API_URL}/files/avatar/${u.avatar}`}
              height="50px"
              width="50px"
            />
            <span className={style.name}>
              {u.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
