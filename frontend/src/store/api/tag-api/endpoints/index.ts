import tagsApi from '..';

const tagsApiEndpoints = tagsApi
  .enhanceEndpoints({
    addTagTypes: ['Tags'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // getUserMe: builder.mutation<User, void>({
      //   query: () => ({
      //     url: '/tags',
      //     method: 'GET',
      //   }),
      //   invalidatesTags: ['Users'],
      // }),
      getTags: builder.query<Tag[], void>({
        query: () => ({
          url: '/tags',
          // method: 'GET',
        }),
        providesTags: ['Tags'],
      }),
    }),
  });

export const {
  useGetTagsQuery,
} = tagsApiEndpoints;
export { tagsApiEndpoints };
