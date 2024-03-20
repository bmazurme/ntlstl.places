import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Modal from '../../../modal';
import EditAvatar from '../edit-avatar';
import { useUpdateUserAvatarMutation } from '../../../../store';

import { BASE_API_URL } from '../../../../utils/constants';

import style from './avatar-button.module.css';

type AvatarProps = {
  popup: { profile: boolean; avatar: boolean; place: boolean; };
  setPopup: (p: { profile: boolean; avatar: boolean; place: boolean; }) => void;
  info: User | null;
  currentUser: User | null;
};

export default function AvatarButton({
  info, popup, setPopup, currentUser,
}: AvatarProps) {
  const errorHandler = useErrorHandler();
  const [updateUserAvatar, { isLoading: isLoadingAvatar }] = useUpdateUserAvatarMutation();
  const handleOpenEditAvatarPopup = () => setPopup({ ...popup, avatar: true });
  const handleCloseAllPopups = () => setPopup({ profile: false, avatar: false, place: false });

  const handleUpdateAvatarSubmit = async (data: FormData) => {
    try {
      await updateUserAvatar(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      {currentUser?.id === info?.id
        ? (
          <div
            className={style.image_button}
            style={{ backgroundImage: `url(${BASE_API_URL}/files/avatar/${currentUser?.avatar})` }}
            onClick={handleOpenEditAvatarPopup}
            aria-hidden="true"
          />
        ) : (
          <div
            className={style.image}
            style={{ backgroundImage: `url(${BASE_API_URL}/files/avatar/${currentUser?.avatar})` }}
            aria-hidden="true"
          />
        )}

      {popup.avatar
        && (
        <Modal
          onClose={handleCloseAllPopups}
          children={(
            <EditAvatar
              isLoading={isLoadingAvatar}
              info={info}
              updateUserAvatar={handleUpdateAvatarSubmit}
            />
          )}
        />
        )}
    </>
  );
}
