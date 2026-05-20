const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        err.message = 'Resource not found';
        err.statusCode = 404;
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: "false",
        message: err.message || 'Internal Server Error',
    });
};
const notFoundMiddleware = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
module.exports = {errorMiddleware, notFoundMiddleware};