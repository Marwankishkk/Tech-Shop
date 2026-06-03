const express = require('express');
const router = express.Router();

const {createOrderController,getMyOrdersController,getOrderByIdController,updateOrderToPaidController} = require('../controllers/orderController.js');
const { protect,admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect,getMyOrdersController).post(protect, createOrderController);
router.route('/:id').get(protect,getOrderByIdController);
router.route('/:id/pay').put(protect, updateOrderToPaidController);
module.exports = router;