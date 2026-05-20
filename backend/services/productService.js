const { getProductById, getAllProducts } = require('../repositories/productRepository');

const getAllProductsService = async () => {
  return await getAllProducts();
};

const getProductByIdService = async (id) => {
  return await getProductById(id);
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};