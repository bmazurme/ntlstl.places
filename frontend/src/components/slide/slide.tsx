import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCardByIdMutation } from '../../store';

import { MODAL_CONFIG } from '../../utils';
import { BASE_API_URL } from '../../utils/constants';

import style from './slide.module.css';

export default function Slide() {
  const params = useParams();
  const [getCardById, { data: card }] = useGetCardByIdMutation();

  useEffect(() => {
    if (params.id) {
      getCardById(params.id);
    }
  }, []);

  return (
    <AnimatePresence>
      <div className={style.slide}>
        <motion.img
          initial={{
            // opacity: 0,
            // scale: 0.175,
          }}
          animate={MODAL_CONFIG.ANIMATE}
          exit={MODAL_CONFIG.EXIT}
          src={`${BASE_API_URL}/files/${card?.link}` ?? ''}
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
