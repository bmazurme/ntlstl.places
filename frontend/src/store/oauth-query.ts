import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

// import { BASE_API_URL } from '../utils/constants';

// Create our baseQuery instance
const oauthQuery = fetchBaseQuery({
  baseUrl: 'https://api.places.ntlstl.dev/',
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

export default oauthQuery;
