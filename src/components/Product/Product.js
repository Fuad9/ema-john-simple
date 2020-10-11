import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product row">
      <div className="col-sm-10 col-md-5">
        <img className="img-fluid w-100" src={img} alt="" />
      </div>
      <div className="ml-5 col-sm-10 col-md-5">
        <h3 className="product-name">
          <Link style={{ textDecoration: "none" }} to={"/product/" + key}>
            {name}
          </Link>
        </h3>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>Price: ${price}</p>
        <p>
          <small>Only {stock} left in stock - Order Soon</small>
        </p>
        {props.showAddToCart === true && (
          <button
            className="cart-button"
            onClick={() => {
              props.handleAddProduct(props.product);
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
