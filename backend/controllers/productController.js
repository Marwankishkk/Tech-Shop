const { getAllProductsService, getProductByIdService } = require('../services/productService');

const getAllProductsController = () => {
    return async (req, res) => {
        try {
            const products = await getAllProductsService();
            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No products found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
                data: products,
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};
const getProductByIdController = (id) => {
    return async (req, res) => {
        try {
            id = req.params.id;
            const product = await getProductByIdService(id);
            res.status(200).json({
                success: true,
                message: 'Product fetched successfully',
                data: product,
            });
        }
        catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

module.exports = {
    getAllProductsController,
    getProductByIdController
}

