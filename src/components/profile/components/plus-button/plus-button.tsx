import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { PlusIcon } from '@heroicons/react/24/outline';

import Modal from '../../../modal';
import AddPlace from '../add-place';
import { useAddCardMutation } from '../../../../store';

import style from './plus-button.module.css';

type PlusProps = {
  popup: { profile: boolean; avatar: boolean; place: boolean; };
  setPopup: (p: { profile: boolean; avatar: boolean; place: boolean; }) => void;
};

export default function PlusButton({ popup, setPopup }: PlusProps) {
  const errorHandler = useErrorHandler();
  const [addCard, { isLoading: isLoadingCard }] = useAddCardMutation();
  const handleOpenAddPlacePopup = () => setPopup({ ...popup, place: true });
  const handleCloseAllPopups = () => setPopup({ profile: false, avatar: false, place: false });
  const handleAddPlaceSubmit = async (data: Record<string, string>) => {
    try {
      await addCard(data);
      handleCloseAllPopups();
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
        <PlusIcon className="h-6 w-6" />
      </button>
      {popup.place
        && (
          <Modal
            onClose={handleCloseAllPopups}
            children={<AddPlace isLoading={isLoadingCard} onAddPlace={handleAddPlaceSubmit} />}
          />
        )}
    </>
  );
}
