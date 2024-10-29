import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({type,title,image,subTitle,faq,categories}) => ({
        url: `edit-layout`,
        method: "PUT",
        body:{
            type,title,image,subTitle,faq,categories   
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery,useEditLayoutMutation } = layoutApi;
