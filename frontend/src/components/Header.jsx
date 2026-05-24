import {Badge,Navbar, Container, Nav} from 'react-bootstrap';
import {FaShoppingCart , FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
const Header = () => {
    const cart = useSelector(state => state.cart);

    return (
        <Navbar bg="dark" variant="dark" expand= "md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Tech Shop Logo" width="30" height="30" className="d-inline-block align-top me-2" />
                    Tech Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                        <Nav.Link>
                            <FaShoppingCart /> Cart
                            {cart.cartItems.length > 0 && (
                                <Badge pill bg="success" style={{marginLeft : '5px'}} >
                                    {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </Badge>
                            )}
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                        <Nav.Link><FaUser /> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;