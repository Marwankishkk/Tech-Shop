import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded h-100 d-flex flex-column">
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            rating={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="mt-auto">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;