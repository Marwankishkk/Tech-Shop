import { OrdersUrl ,PayPalUrl} from "../constants";
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
        payOrder : builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${OrdersUrl}/${orderId}/pay`,
                method: "PUT",
                body: {...details},
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PayPalUrl,
                method: "GET",
            }),
            keepUnusedDataFor : 5,

        }),
    }),
});

export const { useCreateOrderMutation,useGetOrderDetailsQuery ,usePayOrderMutation ,useGetPayPalClientIdQuery} = ordersApiSlice;