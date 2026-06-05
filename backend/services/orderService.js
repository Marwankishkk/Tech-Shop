const {createOrder,getOrdersByUserId,getOrderById,saveOrder,getOrders} =require('../repositories/orderRepository.js');
const createOrderService = async (orderData, user) => {
    if (!orderData.orderItems?.length) {
        const error = new Error('No order items');
        error.statusCode = 400;

        throw error;
    }
    const newOrder = {
        user: user.id,
        orderItems: orderData.orderItems.map(item => ({
            ...item,
            product: item.product
        })),
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: orderData.itemsPrice,
        taxPrice: orderData.taxPrice,
        shippingPrice: orderData.shippingPrice,
        totalPrice: orderData.totalPrice,
    };
    return await createOrder(newOrder);
};

const getMyOrdersService = async (user) => {
    orders = await getOrdersByUserId(user.id)
    if (!orders || orders.length === 0) {
        const error = new Error('No orders found');
        error.statusCode = 404;
        throw error;
    }
    return orders;
}
const getOrderByIdService = async (orderId) => {
    const order = await getOrderById(orderId);
    if (!order) {
        const error = new Error('Order not found');
        error.statusCode = 404;
        throw error;
    }
    return order;
}
 const updateOrderToPaidService = async (orderId, paymentResult) => {
    const order = await getOrderById(orderId);

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    order.isPaid = true;
    order.paidAt = new Date(); // better than Date.now()
    order.paymentResult = {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.payer?.email_address,
    };

    return await saveOrder(order);
};

//admin
const getOrdersService = async () => {
    const orders = await getOrders();
    return orders;
}
const updateOrderToDeliveredService = async (orderId) => {
    const order = await getOrderById(orderId);

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    return await saveOrder(order);
};
module.exports = {
    createOrderService,
    getMyOrdersService,
    getOrderByIdService,
    updateOrderToPaidService,
    getOrdersService,
    updateOrderToDeliveredService
}