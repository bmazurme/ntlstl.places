import cardsApi from '..';

const cardsApiEndpoints = cardsApi
  .enhanceEndpoints({
    addTagTypes: ['Cards'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCards: builder.query<Card[], void>({
        query: () => ({
          url: '/cards',
          method: 'GET',
        }),
        providesTags: ['Cards'],
      }),
      getCardsByTag: builder.query<Card[], string>({
        query: (tag) => ({
          url: `/cards/tag/${tag}`,
          method: 'GET',
        }),
        providesTags: ['Cards'],
      }),
      getCardsByUser: builder.mutation<Card[], string>({
        query: (id) => ({
          url: `/cards/user/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCard: builder.mutation<Card, string>({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'PATCH',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCardById: builder.mutation<Card, string>({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      addCard: builder.mutation({
        query: (data) => ({
          url: '/cards',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation({
        query: (data) => ({
          url: `/cards/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation({
        query: (data) => ({
          url: `/cards/${data?.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      changeLike: builder.mutation({
        query: ({ cardId, value }) => ({
          url: `/cards/${cardId}/likes`,
          method: !value ? 'PUT' : 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
      getLikes: builder.query({
        query: ({ cardId }) => ({
          url: `/cards/likes/${cardId}`,
          method: 'GET',
        }),
        providesTags: ['Cards'],
      }),
    }),
  });

export const {
  useGetCardsQuery,
  useGetCardsByTagQuery,
  useGetCardsByUserMutation,
  useGetCardMutation,
  useDeleteCardMutation,
  useChangeLikeMutation,
  useAddCardMutation,
  useGetLikesQuery,
  useUpdateCardMutation,
  useGetCardByIdMutation,
} = cardsApiEndpoints;
export { cardsApiEndpoints };
