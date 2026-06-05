import { useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useGetOrdersQuery();

  const orders = ordersResponse?.data || [];

  useEffect(() => {
    if (!userInfo || !userInfo?.data?.isAdmin) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <Row>
      <Col md={12}>
        <h1>Orders</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>

                  <td>{order.user?.name || 'N/A'}</td>

                  <td>{order.createdAt?.substring(0, 10)}</td>

                  <td>${order.totalPrice}</td>

                  <td>
                    {order.isPaid
                      ? order.paidAt?.substring(0, 10)
                      : 'No'}
                  </td>

                  <td>
                    {order.isDelivered
                      ? order.deliveredAt?.substring(0, 10)
                      : 'No'}
                  </td>

                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() =>
                        navigate(`/order/${order._id}`)
                      }
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrderListScreen;