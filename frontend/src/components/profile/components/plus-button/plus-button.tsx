import React from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { BiPlus } from '../../../../utils/icons/bi';

import Modal from '../../../modal';
import AddCard from '../add-card';
import { useAddCardMutation, useGetCardsByUserMutation } from '../../../../store';

import style from './plus-button.module.css';

type PlusProps = {
  popup: { profile: boolean; avatar: boolean; place: boolean; };
  setPopup: (p: { profile: boolean; avatar: boolean; place: boolean; }) => void;
};

export default function PlusButton({ popup, setPopup }: PlusProps) {
  const { id } = useParams();
  const [getCards] = useGetCardsByUserMutation();
  const errorHandler = useErrorHandler();
  const [addCard, { isLoading: isLoadingCard }] = useAddCardMutation();
  const handleOpenAddPlacePopup = () => setPopup({ ...popup, place: true });
  const handleCloseAllPopups = () => setPopup({ profile: false, avatar: false, place: false });
  const handleAddPlaceSubmit = async (data: FormData) => {
    try {
      await addCard(data);
      handleCloseAllPopups();
      if (id) {
        await getCards(id);
      }
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      <button
        aria-label="Add"
        className={style.add}
        type="button"
        onClick={handleOpenAddPlacePopup}
      >
        <BiPlus size={38} />
      </button>
      {popup.place
        && (
          <Modal
            onClose={handleCloseAllPopups}
            children={<AddCard isLoading={isLoadingCard} onAddPlace={handleAddPlaceSubmit} />}
          />
        )}
    </>
  );
}
