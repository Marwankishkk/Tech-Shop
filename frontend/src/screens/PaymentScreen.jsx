import {useState , useEffect, use} from 'react';
import { Col } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch ,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }
    , [navigate, shippingAddress]);
    

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
        <Form onSubmit={(e) => {
            e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
            navigate('/placeorder');
        }
        }>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-3'>
            Continue
        </Button>
        </Form>
        </FormContainer>
    );
}
export default PaymentScreen;