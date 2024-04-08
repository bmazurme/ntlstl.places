/* eslint-disable no-undef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { cardsApiEndpoints } from '../api/card-api/endpoints';

import type { RootState } from '..';

import { SHIFT } from '../../utils/constants';

export type CurrentState = {
  data: Card[],
};

export const initialStateCurrent: CurrentState = {
  data: [],
};

const slice = createSlice({
  name: 'current',
  initialState: initialStateCurrent,
  reducers: {
    setCurrent: (
      state,
      { payload: data }: PayloadAction<Card[]>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cardsApiEndpoints.endpoints.getCards.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.slice(0, SHIFT) }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCards.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByTag.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByTag.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      );
  },
});

export const { setCurrent } = slice.actions;
export default slice.reducer;
export const currentSelector = (state: RootState) => state.current.data;
