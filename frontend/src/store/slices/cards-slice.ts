/* eslint-disable no-undef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  reducers: {
    setCards: (
      state,
      { payload: data }: PayloadAction<Card[]>,
    ) => ({ ...state, data }),
    setLike: (
      state,
      { payload }: PayloadAction<{ data: { id?: number, disId?: number } }>,
    ) => ({
      ...state,
      data: state.data.map((x) => {
        if (Number(payload.data?.disId) === x.id) {
          console.log(1, payload.data?.id, payload.data?.disId, x.id);
          return { ...x, isliked: false, count: x.count - 1 };
        } if (Number(payload.data?.id) === x.id) {
          console.log(2, payload.data?.id, payload.data?.disId, x.id);
          return { ...x, isliked: true, count: x.count + 1 };
        }
        console.log(3);
        return x;
      }),
    }),
  },
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   cardsApiEndpoints.endpoints.getCards.matchFulfilled,
      //   (state, action) => ({ ...state, data: action.payload }),
      // )
      // .addMatcher(
      //   cardsApiEndpoints.endpoints.getCards.matchRejected,
      //   (state, action) => {
      //     if (action.error.name !== 'ConditionError') {
      //       console.log('rejected', action);
      //     }
      //   },
      // )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardById.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, action.payload].filter((x) => x) }),
      )
      // .addMatcher(
      //   cardsApiEndpoints.endpoints.changeLike.matchFulfilled,
      //   (state, action) => ({
      //     ...state,
      //     data: state.data.map((c) => {
      //       console.log(state.data);
      //       if (c.id === action.payload?.disId) {
      //         return { ...c, isliked: false, count: c.count - 1 };
      //       } if (c.id === action.payload?.id) {
      //         return { ...c, isliked: true, count: c.count + 1 };
      //       }

      //       return c;
      //     }),
      //   }),
      // )
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
export const { setCards, setLike } = slice.actions;
export const cardsSelector = (state: RootState) => state.cards.data;
