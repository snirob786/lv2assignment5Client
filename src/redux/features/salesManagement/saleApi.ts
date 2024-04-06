import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllBikeDetails: builder.query({
    //   query: () => ({
    //     url: "/bikes",
    //     method: "GET",
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({
    //             type: "SalesBikes" as const,
    //             id,
    //           })),
    //           { type: "SalesBikes", id: "LIST" },
    //         ]
    //       : [{ type: "SalesBikes", id: "LIST" }],
    // }),
    addNewSale: builder.mutation({
      query: (saleData) => ({
        url: `/sales`,
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: [{ type: "SalesBikes", id: "LIST" }],
    }),
  }),
});

export const { useAddNewSaleMutation } = saleApi;
