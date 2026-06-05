import { OrdersUrl, PayPalUrl } from "../constants";
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
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${OrdersUrl}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    getPayPalClientId: builder.query({
      query: () => ({
        url: PayPalUrl,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: OrdersUrl,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${OrdersUrl}/admin/orders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${OrdersUrl}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
  
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
    useDeliverOrderMutation,
} = ordersApiSlice;