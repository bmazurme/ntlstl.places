/* eslint-disable no-undef */
import React from 'react';

import { useAppSelector } from '../../hooks';
import { useGetUsersQuery, usersSelector } from '../../store';

import style from './users-layout.module.css';

export default function NotFoundLayout() {
  // const [getUsers, { isLoading: isLoadingCards }] = useGetUsersMutation();
  const { isLoading } = useGetUsersQuery();
  const users = useAppSelector(usersSelector);
  console.log(isLoading);

  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Users
      </h2>
      <ul className={style.list}>
        {users.map((u: User, i: number) => (
          <li className={style.item} key={i}>
            <img
              className={style.avatar}
              alt={u.name}
              src={`/api/files/avatar/${u.avatar}`}
              height="50px"
              width="50px"
            />
            <span className={style.name}>
              {u.name}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}
