import usersApi from '..';

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.mutation<User, void>({
        query: () => ({
          url: '/users/me',
          method: 'GET',
        }),
        invalidatesTags: ['Users'],
      }),
      updateUser: builder.mutation({
        query: (user: Record<string, string>) => ({
          url: '/users/me',
          method: 'PATCH',
          body: user,
        }),
        invalidatesTags: ['Users'],
      }),
      updateUserAvatar: builder.mutation({
        query: (user) => ({
          url: '/users/me/avatar',
          method: 'PATCH',
          body: user,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  useGetUserMeMutation,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
} = usersApiEndpoints;
export { usersApiEndpoints };
