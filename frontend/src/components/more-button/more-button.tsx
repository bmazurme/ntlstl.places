import React from 'react';
import classNames from 'classnames';
import { BiChevronDown } from '../../utils/icons/bi';

import style from './more-button.module.css';

export default function MoreButton({ handler, disabled }
  : { handler: () => void; disabled: boolean }) {
  return (
    <button
      aria-label="Add"
      className={classNames(style.add, { [style.disabled]: disabled })}
      disabled={disabled}
      type="button"
      onClick={handler}
    >
      <BiChevronDown size={36} />
    </button>
  );
}
