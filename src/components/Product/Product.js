import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="ml-5">
        <h3 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
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
