import { useParams, Link } from "react-router-dom";
import {
    Card,
    Button,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useGetProductDetailsQuery(id);

    const product = data?.data || {};
    if (!isLoading && !error && !product._id) {
        return <Message variant="info">Product not found.</Message>;
    }
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">Error: {error.message}</Message>
            ) : (
                <>
                    <Link className="btn btn-light my-3" to="/">
                        Go Back
                    </Link>

                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating
                                        rating={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>

                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>

                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={product.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;