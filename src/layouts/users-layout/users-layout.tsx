/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { useGetUsersQuery, usersSelector } from '../../store';

import style from './users-layout.module.css';

export default function UsersLayout() {
  const { isLoading } = useGetUsersQuery();
  const users = useAppSelector(usersSelector);

  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Users
      </h2>
      {!isLoading
        && (
        <ul className={style.list}>
          {users.map((u: User, i: number) => (
            <li className={style.item} key={i}>
              <Link to={`/users/${u.id}`} className={style.link}>
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
              </Link>
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}
