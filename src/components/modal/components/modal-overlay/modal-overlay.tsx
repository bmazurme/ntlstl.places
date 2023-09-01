/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactNode } from 'react';

import style from './modal-overlay.module.css';

export default function ModalOverlay({ children, closeModal }
  : { children: ReactNode, closeModal: () => void }) {
  return (
    <div className={style.overlay} onClick={closeModal}>
      {children}
    </div>
  );
}
