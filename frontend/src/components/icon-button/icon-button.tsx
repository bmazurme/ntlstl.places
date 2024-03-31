import React from 'react';

import style from './icon-button.module.css';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export type IconType = (props: IconBaseProps) => JSX.Element;

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
