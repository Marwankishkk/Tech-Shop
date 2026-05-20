import { useState,useEffect } from 'react'
import {Row,Col } from 'react-bootstrap'
import Product from '../components/Product'


const HomeScreen = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
  
          const data = await response.json();
  
          setProducts(data.data); // based on your backend: { success, data }
  
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="d-flex">
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
export default HomeScreen;