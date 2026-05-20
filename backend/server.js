const express = require('express');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRouter');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5005;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
    });
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