const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const {notFoundMiddleware,errorMiddleware} = require('./middlewares/errorMiddleware');
const productRoutes = require('./routes/productRouter');
const userRoutes = require('./routes/userRouter');
const orderRoutes = require('./routes/orderRouter');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5005;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('API is running...');
    });
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
    res.send({
        clientId: process.env.PAYPAL_CLIENT_ID,
    });
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);


async function start() {
    try {
        await connectDB();
        app.listen(PORT, console.log(`Server running in ${NODE_ENV} on port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
}
start();