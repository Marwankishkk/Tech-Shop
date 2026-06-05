import { Row, Col, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const { data: response, error, isLoading } =
    useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const product = response?.data || {};

  // 🔥 keep everything as string for smooth UX
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!userInfo?.data?.isAdmin) {
      navigate('/login');
      return;
    }

    if (product) {
      setName(product.name || '');
      setPrice(product.price?.toString() || '');
      setDescription(product.description || '');
      setCountInStock(product.countInStock?.toString() || '');
      setImage(product.image || '');
    }
  }, [navigate, userInfo, product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        updateData: {
          name,
          price: Number(price),
          description,
          countInStock: Number(countInStock),
          image,
        },
      }).unwrap();

      navigate('/admin/productlist');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <h1>Edit Product</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="my-3"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default ProductEditScreen;