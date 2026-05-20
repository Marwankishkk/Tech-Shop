const { getProductById, getAllProducts } = require('../repositories/productRepository');

const getAllProductsService = async () => {
    
  return await getAllProducts();
};

const getProductByIdService = async (id) => {
  const product = await getProductById(id);

  return product;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};