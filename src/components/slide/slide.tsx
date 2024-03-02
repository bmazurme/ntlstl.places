import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppSelector } from '../../hooks';
import { cardSelector } from '../../store';

import { MODAL_CONFIG } from '../../utils';

import style from './slide.module.css';

export default function Slide() {
  const card = useAppSelector(cardSelector);

  return (
    <AnimatePresence>
      <div className={style.slide}>
        <motion.img
          initial={{
            opacity: 0,
            scale: 0.175,
          }}
          animate={MODAL_CONFIG.ANIMATE}
          exit={MODAL_CONFIG.EXIT}
          src={`/api/files/${card?.link}` ?? ''}
          alt={card?.name ?? ''}
          className={style.image}
          height="100%"
          width="100%"
        />
        <p className={style.name}>{card?.name ?? ''}</p>
      </div>
    </AnimatePresence>
  );
}
