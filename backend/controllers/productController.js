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

  if (!products || products.length === 0) {
    return sendResponse(res, 404, false, 'No products found');
  }

  return sendResponse(res, 200, true, 'Products fetched successfully', products);
});

// ================= GET PRODUCT BY ID =================
const getProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await getProductByIdService(id);

  if (!product) {
    return sendResponse(res, 404, false, 'Product not found');
  }

  return sendResponse(res, 200, true, 'Product fetched successfully', product);
});