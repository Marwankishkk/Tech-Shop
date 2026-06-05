const express = require('express');
const router = express.Router();

const {createOrderController,getMyOrdersController,getOrderByIdController,updateOrderToPaidController,getOrdersController,updateOrderToDeliveredController} = require('../controllers/orderController.js');
const { protect,admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect,getMyOrdersController).post(protect, createOrderController);
router.route('/:id').get(protect,getOrderByIdController);
router.route('/:id/pay').put(protect, updateOrderToPaidController);
router.route('/admin/orders').get(protect, admin, getOrdersController);
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliveredController);

module.exports = router;