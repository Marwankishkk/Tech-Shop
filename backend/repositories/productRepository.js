const Product = require('../models/productModel');

const getAllProducts = async () => {
    return await Product.find({});
};

const getProductById = async (id) => {
    return await Product.findById(id); 
};

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
}
const findByIdAndUpdate = async (productId, updateData, options) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, options);
    return updatedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    findByIdAndUpdate
};