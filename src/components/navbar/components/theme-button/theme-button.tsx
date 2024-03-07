/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import ThemeContext from '../../../../context/theme-context';

import style from './theme-button.module.css';

export default function ThemeButton() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const onToggle = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('ms-theme', isDark === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={style.icon}
      type="button"
      onClick={onToggle}
      aria-label="Switch theme"
    >
      {isDark === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
}
