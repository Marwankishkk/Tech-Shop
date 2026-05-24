import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
const HomeScreen = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    const products = data?.data || [];

    if (products.length === 0 && !isLoading) {

        return <Message variant="info">No products found.</Message>;
    }
    return (
        <>
            <h1>Latest Products</h1>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">Error: {error.message}</Message>
            ) : (
                <Row>
                    {products?.map((product) => (
                        <Col
                            key={product._id}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                            className="d-flex"
                        >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;