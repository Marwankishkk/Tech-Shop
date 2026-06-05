import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card,Button } from "react-bootstrap";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation
} from "../slices/ordersApiSlice";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: response,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const order = response?.data;

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { data: paypalResponse } = useGetPayPalClientIdQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.user);

  // ----------------------------
  // Load PayPal script
  // ----------------------------
  useEffect(() => {
    const clientId = paypalResponse?.clientId;

    if (!order || order.isPaid || !clientId) return;

    paypalDispatch({
      type: "resetOptions",
      value: {
        "client-id": clientId,
        currency: "USD",
      },
    });

    paypalDispatch({
      type: "setLoadingStatus",
      value: "pending",
    });
  }, [order, paypalResponse, paypalDispatch]);

  // ----------------------------
  // PayPal approve (NO capture here)
  // ----------------------------
  const onApprove = async (data) => {
    try {
      await payOrder({
        orderId,
        paypalOrderId: data.orderID,
      }).unwrap();

      toast.success("Payment successful");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  // ----------------------------
  // Error handler
  // ----------------------------
  const onError = (err) => {
    toast.error(err.message);
  };

  // ----------------------------
  // Create PayPal order
  // ----------------------------
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Number(order.totalPrice).toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  // ----------------------------
  // Loading / error
  // ----------------------------
  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    );

  if (!order) return null;


  const deliverOrderHandler = async (orderId) => {
    try {
        await deliverOrder(orderId).unwrap();
        toast.success('Order marked as delivered');
        refetch();
    } catch (err) {
        toast.error(err?.data?.message || err.message);
    }
    };
  // ----------------------------
  // UI
  // ----------------------------

  return (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        {/* LEFT */}
        <Col md={8}>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h2>Shipping</h2>

              <p><strong>Name:</strong> {order.user.name}</p>

              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{" "}
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}

              {order.isPaid ? (
                <Message variant="success">
                  Paid on{" "}
                  {new Date(order.paidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

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

        {/* RIGHT */}
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

              {/* PAYPAL */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </ListGroup.Item>
              )}
            {loadingDeliver && <Loader />}
                {userInfo?.data?.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn btn-block"
                        onClick={() => deliverOrderHandler(order._id)}
                    >
                        Mark As Delivered
                    </Button>
                    </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;