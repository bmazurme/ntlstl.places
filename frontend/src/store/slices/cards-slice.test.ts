import { describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

import reducer from './cards-slice';
import { cardsApiEndpoints } from '../api/card-api/endpoints';

fetchMock.enableMocks();

const initialState = {
  data: [{
    id: '0',
    name: 'name',
    link: 'link',
    user_id: 0,
    user: { name: 'string' },
    likes: [{ user_id: 0 }],
  }],
};

describe('cards', () => {
  it('...', async () => {
    const action = {
      type: cardsApiEndpoints.endpoints.getCards.matchFulfilled,
      payload: {},
    };
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
