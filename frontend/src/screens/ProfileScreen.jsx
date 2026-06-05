import { useSelector ,useDispatch} from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useEffect ,useState} from "react";
import { Row, Col, ListGroup, Image, Card, Button,Table,Form } from "react-bootstrap";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/userSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const [updateProfile, { isLoading }] = useProfileMutation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(``);
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.data.name);
            setEmail(userInfo.data.email);
        }
    }, [navigate, userInfo]);
    const { data: response, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();
    const orders = response?.data || [];

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials(res));
            toast.success('Profile Updated');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }


    return (
        

        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Update
                </Button>

                
            </Form>


            </Col>
            <Col md={9}>
  <h2>My Orders</h2>

  {loadingOrders ? (
    <Message>Loading...</Message>
  ) : errorOrders ? (
    <Message variant='danger'>
      {errorOrders?.data?.message || errorOrders.error}
    </Message>
  ) : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>

            <td>
              {order.createdAt
                ? order.createdAt.substring(0, 10)
                : ''}
            </td>

            <td>${order.totalPrice}</td>

            <td>
              {order.isPaid && order.paidAt
                ? order.paidAt.substring(0, 10)
                : 'No'}
            </td>

            <td>
              {order.isDelivered && order.deliveredAt
                ? order.deliveredAt.substring(0, 10)
                : 'No'}
            </td>

            <td>
              <Button
                variant='light'
                className='btn-sm'
                onClick={() => navigate(`/order/${order._id}`)}
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
    }

export default ProfileScreen;