import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded h-100 d-flex flex-column w-100">
      
      {/* Image Container (fixed height, prevents layout shift) */}
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Card.Img
            src={product.image}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </Link>

      {/* Body */}
      <Card.Body className="d-flex flex-column flex-grow-1">

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

        {/* price pinned to bottom */}
        <Card.Text as="h3" className="mt-auto text-center">
          ${product.price}
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default Product;