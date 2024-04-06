import { baseApi } from "../../api/baseApi";

const bikeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBikeDetails: builder.query({
      query: (id: string) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),
    getAllBikeDetails: builder.query({
      query: (params) => ({
        url: "/bikes",
        method: "GET",
        params: params,
      }),
    }),
    addNewBike: builder.mutation({
      query: (bike) => ({
        url: `/bikes`,
        method: "POST",
        body: bike,
      }),
    }),
    updateBike: builder.mutation({
      query: (bike) => ({
        url: `/bikes/${bike.id}`,
        method: "PUT",
        body: bike,
      }),
    }),
    deleteBike: builder.mutation({
      query: (id: string | Array<string>) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
    }),
    deleteSelectedBikes: builder.mutation({
      query: (ids: Array<string>) => ({
        url: `/bikes`,
        method: "DELETE",
        body: ids,
      }),
    }),
  }),
});

export const {
  useGetSingleBikeDetailsQuery,
  useGetAllBikeDetailsQuery,
  useAddNewBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useDeleteSelectedBikesMutation,
} = bikeManagementApi;
