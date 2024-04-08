/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

import { cardsApiEndpoints } from '../api/card-api/endpoints';
import type { RootState } from '..';

export type CardsState = {
  data: Card[],
};

export const initialStateCards: CardsState = {
  data: [],
};

const slice = createSlice({
  name: 'cards',
  initialState: initialStateCards,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cardsApiEndpoints.endpoints.getCards.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
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

export default slice.reducer;
export const cardsSelector = (state: RootState) => state.cards.data;
