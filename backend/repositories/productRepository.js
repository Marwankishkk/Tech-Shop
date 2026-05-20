const Product = require('../models/productModel');

const getAllProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}
module.exports = {
    getAllProducts,
    getProductById,
}