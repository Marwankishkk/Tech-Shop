const Product = require('../models/productModel');

const getAllProducts = async () => {
    try {
        console.log('Fetching all products from the database...');
        const products = await Product.find({});

        console.log('Products fetched successfully:', products);
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