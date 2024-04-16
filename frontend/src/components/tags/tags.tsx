import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tag from '../tag';

import style from './tags.module.css';

export default function Tags({ tags }: { tags: Tag[] | undefined; }) {
  return (
    <ul className={style.tags}>
      {tags?.map((tag) => <Tag key={uuidv4()} tag={tag} />)}
    </ul>
  );
}
