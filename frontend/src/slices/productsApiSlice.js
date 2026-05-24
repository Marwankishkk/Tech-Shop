import {apiSlice} from "./apiSlice";
import { ProductsUrl } from "../constants";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ProductsUrl,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (productId) => `${ProductsUrl}/${productId}`,
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsQuery,useGetProductDetailsQuery } = productsApiSlice;