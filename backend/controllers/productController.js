const asyncHandler = require('../middlewares/asyncHandler');
const {
  getAllProductsService,
  getProductByIdService,
} = require('../services/productService');

const sendResponse = (res, status, success, message, data = null) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};

// ================= GET ALL PRODUCTS =================
const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProductsService();

  return sendResponse(
    res,
    200,
    true,
    'Products fetched successfully',
    products
  );
});

// ================= GET PRODUCT BY ID =================
const getProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await getProductByIdService(id);
    
  return sendResponse(
    res,
    200,
    true,
    'Product fetched successfully',
    product
  );
});

module.exports = {
    getAllProductsController,
    getProductByIdController,
    };