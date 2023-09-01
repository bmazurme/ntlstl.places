import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import style from './navbar-item.module.css';

export interface INavItemProps {
  to: string,
  className?: string;
  onClick?: () => void,
  active: string,
  value: string,
}

export default function NavItem({
  to, onClick, className, active, value,
}: INavItemProps) {
  return (
    <li className={style.item}>
      <Link
        to={to}
        onClick={onClick}
        className={classNames(className, style.link, { [style.active]: active })}
      >
        {value}
      </Link>
    </li>
  );
}
