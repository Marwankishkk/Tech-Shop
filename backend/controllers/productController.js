const asyncHandler = require('../middlewares/asyncHandler');
const {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService
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
// ================= Create PRODUCT =================

const createProductController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  const newProduct = await createProductService(userId);

  return sendResponse(
    res,
    201,
    true,
    'Product created successfully',
    newProduct
  );
});
const updateProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedProduct = await updateProductService(id, updateData);

  return sendResponse(
    res,
    200,
    true,
    'Product updated successfully',
    updatedProduct
  );
}
);

module.exports = {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    updateProductController
    };