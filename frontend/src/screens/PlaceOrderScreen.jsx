import {useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import {toast} from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = cart;
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, shippingAddress, paymentMethod]);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const dispatch = useDispatch();
    const placeOrderHandler = async () => {
        try {
            const orderData = {
               
                orderItems: cart.cartItems.map(item => ({
                    product: item._id,   
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    image: item.image,
                  })
                ),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.itemsPrice + cart.shippingPrice + cart.taxPrice,
            };
            const res = await createOrder(orderData).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res.data._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    return (<>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row className='align-items-center'>
                                            <Col md={1}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className='img-fluid rounded'
                                                />
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = $
                                                {(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.itemsPrice + cart.shippingPrice + cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className='d-grid'>
                            <Button type='button' className='btn-block'  disabled={cart.cartItems.length === 0 }
                             onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>

                </Card>
            </Col>

        </Row>
        </>
    );
    }

export default PlaceOrderScreen;