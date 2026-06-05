const {
    createOrderService,
    getMyOrdersService,
    getOrderByIdService,
    updateOrderToPaidService,
    getOrdersService,
    updateOrderToDeliveredService,
  } = require('../services/orderService.js');
  
  const asyncHandler = require('../middlewares/asyncHandler');
  
  const createOrderController = asyncHandler(async (req, res) => {
    const user = req.user;
  
    const newOrder = await createOrderService(req.body, user);
  
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  });
  
  const getMyOrdersController = asyncHandler(async (req, res) => {
    const user = req.user;
  
    const orders = await getMyOrdersService(user);
  
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  });
  
  const getOrderByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const order = await getOrderByIdService(id);
  
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: order,
    });
  });
  
  const updateOrderToPaidController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const paymentResult = req.body;
  
    const updatedOrder = await updateOrderToPaidService(
      id,
      paymentResult
    );
  
    res.status(200).json({
      success: true,
      message: 'Order updated to paid successfully',
      data: updatedOrder,
    });
  });
  
  const updateOrderToDeliveredController = asyncHandler(
    async (req, res) => {
      const { id } = req.params;
  
      const updatedOrder = await updateOrderToDeliveredService(id);
  
      res.status(200).json({
        success: true,
        message: 'Order updated to delivered successfully',
        data: updatedOrder,
      });
    }
  );
  
  const getOrdersController = asyncHandler(async (req, res) => {
    const orders = await getOrdersService();
  
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  });
  
  module.exports = {
    createOrderController,
    getMyOrdersController,
    getOrderByIdController,
    updateOrderToPaidController,
    updateOrderToDeliveredController,
    getOrdersController,
  };