import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import classNames from 'classnames';

import { BiSolidTrashAlt } from '../../../../utils/icons/bi';
import Modal from '../../../modal';
import WithConfirm from '../../../with-confirm';

import { useDeleteCardMutation, useGetCardsByUserMutation } from '../../../../store';

import style from './remove-button.module.css';

interface IRemoveProps {
  user: User | null;
  card: Card;
}

export default function RemoveButton({ user, card }: IRemoveProps) {
  const { id } = useParams();
  const errorHandler = useErrorHandler();
  const [getCards] = useGetCardsByUserMutation();
  const [deleteCard, { isLoading: isLoadingCard }] = useDeleteCardMutation();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const isOwn = card?.user_id === user?.id;
  const handleCloseAllPopups = () => setConfirmPopup(false);
  const handleCardDelete = async () => {
    try {
      await deleteCard(card);
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
      {isOwn
        && (
          <button
            onClick={() => setConfirmPopup(true)}
            aria-label="Remove"
            className={classNames(style.remove)}
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
