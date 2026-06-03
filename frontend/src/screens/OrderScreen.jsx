import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: response, error, isLoading } =
    useGetOrderDetailsQuery(orderId);

  const order = response?.data;

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    );

  if (!order) return null;

  return (
    <>
      <h1>Order {orderId}</h1>

      <Row>
        {/* LEFT SIDE */}
        <Col md={8}>
          <ListGroup variant="flush">

            {/* SHIPPING */}
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: </strong> {order.user.name}
              </p>

              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{" "}
                  {order.deliveredAt &&
                    new Date(order.deliveredAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}

              {order.isPaid ? (
                <Message variant="success">
                  Paid on{" "}
                  {order.paidAt &&
                    new Date(order.paidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* ORDER ITEMS */}
            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
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
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;