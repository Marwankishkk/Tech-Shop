const express = require('express');

const router = express.Router();


const {getAllProductsController,getProductByIdController,createProductController,updateProductController} = require('../controllers/productController');
const { protect,admin } = require('../middlewares/authMiddleware');

router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/',protect,admin ,createProductController);
router.route('/:id').put(protect,admin,updateProductController);
module.exports = router;