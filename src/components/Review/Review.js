import React, { useEffect } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import { useState } from "react";
import ReviewItems from "../ReviewItems/ReviewItems";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);

  const [orderPlaced, setOrderPlaced] = useState(false);

  // to clean database by handler
  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  // Click handler
  const removeItem = (productKey) => {
    const newCart = cart.filter((prod) => prod.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const countProducts = productKeys.map((k) => {
      const product = fakeData.find((prod) => prod.key === k);
      product.quantity = savedCart[k];
      return product;
    });
    setCart(countProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((prod) => (
          <ReviewItems
            key={prod.key}
            product={prod}
            removeItem={removeItem}
          ></ReviewItems>
        ))}
        {thankYou}
      </div>
      <Cart cart={cart}>
        <Link to="/review">
          <button className="cart-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </Link>
      </Cart>
    </div>
  );
};

export default Review;
