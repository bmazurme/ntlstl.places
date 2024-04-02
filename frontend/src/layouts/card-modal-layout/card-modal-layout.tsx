/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../components/modal';
import Slide from '../../components/slide';

import { setCard } from '../../store';
import { useAppDispatch } from '../../hooks';

import { Urls } from '../../utils/constants';

export default function UserLayout() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state }: any = useLocation();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(state?.from || Urls.BASE);
    dispatch(setCard(null));
  }, [state, navigate]);

  return (
    <Modal children={<Slide />} onClose={handleClose} />
  );
}
