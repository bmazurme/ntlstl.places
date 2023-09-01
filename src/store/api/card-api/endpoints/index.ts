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
      getCard: builder.mutation({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'PATCH',
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
          url: `/cards/${data?._id}`,
          method: 'DELETE',
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
    }),
  });

export const {
  useGetCardsQuery,
  useGetCardMutation,
  useDeleteCardMutation,
  useChangeLikeMutation,
  useAddCardMutation,
} = cardsApiEndpoints;
export { cardsApiEndpoints };
