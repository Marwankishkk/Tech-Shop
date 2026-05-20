const { getProductById, getAllProducts } = require('../repositories/productRepository');

const getAllProductsService = async () => {
  try {
    return await getAllProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const getProductByIdService = async (id) => {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};