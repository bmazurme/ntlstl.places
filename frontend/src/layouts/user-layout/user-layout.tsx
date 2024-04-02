/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import Board from '../../components/board';
import Profile from '../../components/profile';
import UserCards from '../../components/user-cards';

import { useGetUserByIdQuery } from '../../store';

export default function UserLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserByIdQuery(id!);

  useEffect(() => {
    if (error && (error as FetchBaseQueryError & { status: number; }).status === 404) {
      navigate('/not-found-page');
    }
  }, [id, (error as FetchBaseQueryError & { status: number; })?.status]);

  return (
    <>
      {user && <Profile currentUser={user} />}
      <Board children={<UserCards />} />
    </>
  );
}
