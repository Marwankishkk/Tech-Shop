const express = require('express');

const router = express.Router();


const {getAllProductsController,getProductByIdController} = require('../controllers/productController');

router.get('/', getAllProductsController());
router.get('/:id', getProductByIdController());

module.exports = router;