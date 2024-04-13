import React from 'react';
import { Link } from 'react-router-dom';

import style from './tag.module.css';

export default function Tag({ tag }: { tag: Tag }) {
  return (
    <li className={style.tag}>
      <Link to={`/tag/${tag.name}`} className={style.link}>
        {tag.name}
      </Link>
    </li>
  );
}
