import { useState } from "react";
import { useParams, Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
    const { id } = useParams();
    const [qty, setQty] = useState(1);

    const { data, error, isLoading } = useGetProductDetailsQuery(id);

    const product = data?.data || {};
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        Navigate("/cart");
    };
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
                                     {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>

                                                <Col>
                                                    <select
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(Number(e.target.value))
                                                        }
                                                        className="form-control"
                                                    >
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                     )
                                     }
                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
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