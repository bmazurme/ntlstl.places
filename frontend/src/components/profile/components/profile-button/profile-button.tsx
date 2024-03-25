import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { BiPencil } from 'react-icons/bi';

import Modal from '../../../modal';
import EditProfile from '../edit-profile';
import { useUpdateUserMutation } from '../../../../store';

import style from './profile-button.module.css';

type ProfileProps = {
  popup: { profile: boolean; avatar: boolean; place: boolean; };
  setPopup: (p: { profile: boolean; avatar: boolean; place: boolean; }) => void;
  info: User | null;
};

export default function ProfileButton({ info, popup, setPopup }: ProfileProps) {
  const errorHandler = useErrorHandler();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();
  const handleOpenEditProfilePopup = () => setPopup({ ...popup, profile: true });
  const handleCloseAllPopups = () => setPopup({ profile: false, avatar: false, place: false });
  const handleUpdateUserSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      <button
        aria-label="Edit"
        type="button"
        className={style.edit}
        onClick={handleOpenEditProfilePopup}
      >
        <BiPencil size={14} />
      </button>
      {popup.profile
        && (
        <Modal
          onClose={handleCloseAllPopups}
          children={(
            <EditProfile
              isLoading={isLoadingUser}
              info={info}
              onUpdateUser={handleUpdateUserSubmit}
            />
          )}
        />
        )}
    </>
  );
}
