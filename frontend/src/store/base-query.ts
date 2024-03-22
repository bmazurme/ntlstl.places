import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

import { BASE_API_URL } from '../utils/constants';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

export default baseQuery;
