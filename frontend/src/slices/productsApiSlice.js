import { apiSlice } from "./apiSlice";
import { ProductsUrl } from "../constants";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL PRODUCTS
        getProducts: builder.query({
            query: () => ProductsUrl,
            providesTags: ['Products'],
        }),

        // GET SINGLE PRODUCT
        getProductDetails: builder.query({
            query: (productId) => `${ProductsUrl}/${productId}`,
            providesTags: (result, error, id) => [
                { type: 'Products', id }
            ],
        }),

        // CREATE PRODUCT
        createProduct: builder.mutation({
            query: (productData) => ({
                url: ProductsUrl,
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Products'],
        }),

        // UPDATE PRODUCT 
        updateProduct: builder.mutation({
            query: ({ productId, updateData }) => {
                return {
                    url: `${ProductsUrl}/${productId}`,
                    method: 'PUT',
                    body: updateData,
                };
            },
            invalidatesTags: ['Products'],
        }),

        // DELETE PRODUCT
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${ProductsUrl}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice;