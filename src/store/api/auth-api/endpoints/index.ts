import authApi from '..';

const authApiEndpoints = authApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signInWitOauthYa: builder.mutation({
        query: (body) => ({
          url: '/oauth',
          method: 'POST',
          body,
        }),
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
      }),
    }),
  });

export const { useSignOutMutation, useSignInWitOauthYaMutation } = authApiEndpoints;
export { authApiEndpoints };
