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
    }),
});

export const { useCreateOrderMutation } = ordersApiSlice;