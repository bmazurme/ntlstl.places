import React from 'react';

import Title from '../../components/title';

import style from './tags-layout.module.css';

export default function TagsLayout() {
  return (
    <div className={style.container}>
      <Title text="Tags" />
    </div>
  );
}
