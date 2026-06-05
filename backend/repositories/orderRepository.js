const Order = require('../models/orderModel.js');

const createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
}

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('user', 'name email');
    return order;
}

const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return orders;
}

 const saveOrder = async (order) => {
    return await order.save();
};

const getOrders = async () => {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    return orders;
}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    saveOrder,
    getOrders


}