/* eslint-disable no-undef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { cardsApiEndpoints } from '../api/card-api/endpoints';

import type { RootState } from '..';

import { SHIFT } from '../../utils/constants';

export type UserCurrentState = {
  data: Card[],
};

export const initialStateUserCurrent: UserCurrentState = {
  data: [],
};

const slice = createSlice({
  name: 'ucurrent',
  initialState: initialStateUserCurrent,
  reducers: {
    setUserCurrent: (
      state,
      { payload: data }: PayloadAction<Card[]>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByUser.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.slice(0, SHIFT) }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByUser.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      );
  },
});

export const { setUserCurrent } = slice.actions;
export default slice.reducer;
export const userCurrentSelector = (state: RootState) => state.ucurrent.data;
