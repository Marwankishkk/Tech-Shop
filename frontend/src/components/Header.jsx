import {Navbar, Container, Nav} from 'react-bootstrap';
import {faShoppingCart , faUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/logo.png';
const Header = () => {
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
                        <Nav.Link><faShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                        <Nav.Link><faUser /> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;