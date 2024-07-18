  checkout: builder.mutation<any, { params?: any }>({
      query: ({ params }) => ({
        url: `/api/checkout`,
        method: 'POST',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['cart'],
    }),
