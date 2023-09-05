/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';

import style from './not-found-layout.module.css';

export default function NotFoundLayout() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>404</h2>
      <h3 className={style.description}>Page not found</h3>
      <Link className={style.link} to="/">Home</Link>
    </div>
  );
}
