import React from 'react';
import { IconType } from 'react-icons';

import style from './icon-button.module.css';

export default function EditAvatar({ component: Component, onClick }
  : { component: IconType; onClick: () => void; }) {
  return (
    <button
      className={style.icon}
      type="button"
      onClick={onClick}
    >
      <Component />
    </button>
  );
}
