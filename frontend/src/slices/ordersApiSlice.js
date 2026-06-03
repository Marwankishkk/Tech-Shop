import { OrdersUrl } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: OrdersUrl,
                method: "POST",
                body: orderData,
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${OrdersUrl}/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5, // Cache the order details for 5 seconds after the last use
        }),
        
    }),
});

export const { useCreateOrderMutation,useGetOrderDetailsQuery } = ordersApiSlice;