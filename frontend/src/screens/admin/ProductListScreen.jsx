import { useEffect } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const products = productsResponse?.data || [];

  useEffect(() => {
    if (!userInfo || !userInfo?.data?.isAdmin) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const createProductHandler = async () => {
    if (window.confirm('Create new product?')) {
      try {
        const res = await createProduct().unwrap();

        // refresh list after creation
        refetch();

        // go to edit page
        navigate(`/admin/product/${res.data._id}/edit`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Row>
      <Col md={12}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Products</h1>

          <Button
            variant="primary"
            onClick={createProductHandler}
            disabled={loadingCreate}
          >
            <FaPlus className="me-2" />
            {loadingCreate ? 'Creating...' : 'Create Product'}
          </Button>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm align-middle"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th style={{ width: '140px' }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="light"
                        className="btn-sm border"
                        onClick={() =>
                          navigate(
                            `/admin/product/${product._id}/edit`
                          )
                        }
                      >
                        <FaEdit />
                      </Button>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => {
                          // delete handler
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </div>
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

export default ProductListScreen;