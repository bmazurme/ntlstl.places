import filesApi from '..';

const filesApiEndpoints = filesApi
  .enhanceEndpoints({
    addTagTypes: ['Files'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      uploadFile: builder.mutation({
        query: (formData) => ({
          url: '/files',
          method: 'POST',
          body: formData,
        }),
      }),
    }),
  });

export const { useUploadFileMutation } = filesApiEndpoints;
export { filesApiEndpoints };
