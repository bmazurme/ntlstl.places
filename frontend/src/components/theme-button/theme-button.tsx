/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { BiMoon, BiSun } from '../../utils/icons/bi';

import ThemeContext from '../../context/theme-context';

import style from './theme-button.module.css';

export default function ThemeButton() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const onToggle = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('ms-theme', isDark === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={style.button}
      type="button"
      onClick={onToggle}
      aria-label="Switch theme"
    >
      {isDark === 'light' ? <BiMoon /> : <BiSun />}
    </button>
  );
}
