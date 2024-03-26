/* eslint-disable no-var */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

export var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};
export var IconContext = React.createContext && /* #__PURE__ */React.createContext(DefaultContext);
