import React from 'react';
import classNames from 'classnames';

import style from './tooltip.module.css';

export default function InfoTooltip({ text, isSuccess }: { text: string; isSuccess: boolean; }) {
  return (
    <div className={style.tooltip}>
      <div className={classNames(style.image, { [style.success]: isSuccess })} />
      <p className={style.text}>{text}</p>
    </div>
  );
}
