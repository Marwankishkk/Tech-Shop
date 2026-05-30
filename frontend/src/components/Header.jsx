import {
    Badge,
    Navbar,
    Container,
    Nav,
    NavDropdown,
  } from 'react-bootstrap';
  
  import { FaShoppingCart, FaUser } from 'react-icons/fa';
  import { Link ,useNavigate} from 'react-router-dom';
  import { LinkContainer } from 'react-router-bootstrap';
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';
  import { logout } from '../slices/userSlice';
  import {useLogoutMutation} from '../slices/usersApiSlice';
  import { toast } from 'react-toastify';
  import logo from '../assets/logo.png';
  
  const Header = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
  
    const { userInfo } = user;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

  
    const logoutHandler = () => {
        try {
            logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
      
    };
  
    return (
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                alt='Tech Shop Logo'
                width='30'
                height='30'
                className='d-inline-block align-top me-2'
              />
              Tech Shop
            </Navbar.Brand>
          </LinkContainer>
  
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
  
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cart.cartItems.length > 0 && (
                    <Badge
                      pill
                      bg='success'
                      style={{ marginLeft: '5px' }}
                    >
                      {cart.cartItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
  
              {userInfo ? (
                <NavDropdown title={userInfo.data.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default Header;