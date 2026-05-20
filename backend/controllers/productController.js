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
  const getAllProductsController = async (req, res) => {
    try {
      const products = await getAllProductsService();
  
      if (!products || products.length === 0) {
        return sendResponse(
          res,
          404,
          false,
          'No products found'
        );
      }
  
      return sendResponse(
        res,
        200,
        true,
        'Products fetched successfully',
        products
      );
    } catch (error) {
      console.error(error);
  
      return sendResponse(
        res,
        500,
        false,
        'Server error'
      );
    }
  };
  
  // ================= GET PRODUCT BY ID =================
  const getProductByIdController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await getProductByIdService(id);
  
      if (!product) {
        return sendResponse(
          res,
          404,
          false,
          'Product not found'
        );
      }
  
      return sendResponse(
        res,
        200,
        true,
        'Product fetched successfully',
        product
      );
    } catch (error) {
      console.error(error);
  
      return sendResponse(
        res,
        500,
        false,
        'Server error'
      );
    }
  };
  
  module.exports = {
    getAllProductsController,
    getProductByIdController,
  };