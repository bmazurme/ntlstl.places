/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';

import Board from '../../components/board';
import Preloader from '../../components/preloader';

import { useAppSelector } from '../../hooks';
import { useGetUsersQuery, usersSelector } from '../../store';

import { BASE_API_URL, Urls } from '../../utils/constants';

import style from './users-layout.module.css';

export default function UsersLayout() {
  const { isLoading } = useGetUsersQuery();
  const users = useAppSelector(usersSelector);

  return (
    <Board
      title="Users"
      children={(isLoading ? <Preloader />
        : (
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
        )
      )}
    />
  );
}
