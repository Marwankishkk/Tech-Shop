const { getProductById, getAllProducts , createProduct ,findByIdAndUpdate} = require('../repositories/productRepository');

const getAllProductsService = async () => {
    
  return await getAllProducts();
};

const getProductByIdService = async (id) => {
  const product = await getProductById(id);

  return product;
};
const createProductService = async (userId) => {
  const product = {
    name: 'Sample name',
    price: 0,
    user: userId, // ✅ هنا التصحيح
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  };

  const createdProduct = await createProduct(product);
  return createdProduct;
};

const updateProductService = async (productId, updateData) => {
  const updatedProduct = await findByIdAndUpdate(
    productId,
    {
      name: updateData.name?.trim(),
      price: updateData.price,
      description: updateData.description?.trim(),
      image: updateData.image?.trim(),
      brand: updateData.brand?.trim(),
      category: updateData.category?.trim(),
      countInStock: updateData.countInStock,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedProduct;

};
module.exports = {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService
};