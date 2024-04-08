import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import classNames from 'classnames';

import Modal from '../../../modal';
import WithConfirm from '../../../with-confirm';
import { BiSolidTrashAlt } from '../../../../utils/icons/bi';

import { useDeleteCardMutation } from '../../../../store';

import style from './remove-button.module.css';

interface IRemoveProps {
  user: User | null;
  card: Card;
}

export default function RemoveButton({ user, card }: IRemoveProps) {
  const errorHandler = useErrorHandler();
  const [deleteCard, { isLoading: isLoadingCard }] = useDeleteCardMutation();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const isOwn = card?.userid === user?.id;
  const handleCloseAllPopups = () => setConfirmPopup(false);
  const handleCardDelete = async () => {
    try {
      await deleteCard(card);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      {isOwn
        && (
          <button
            onClick={() => setConfirmPopup(true)}
            aria-label="Remove"
            className={classNames(style.button)}
            type="button"
          >
            <BiSolidTrashAlt size={40} />
          </button>
        )}
      {confirmPopup
        && (
          <Modal
            onClose={handleCloseAllPopups}
            children={(
              <WithConfirm
                card={card}
                isLoading={isLoadingCard}
                title="Вы уверены?"
                buttonText={isLoadingCard ? 'Удаляется...' : 'Удалить'}
                onSubmit={handleCardDelete}
              />
            )}
          />
        )}
    </>
  );
}
