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
import { Link, useHistory } from "react-router-dom";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  // Click handler
  const removeItem = (productKey) => {
    const newCart = cart.filter((prod) => prod.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  // to load multiple data not all from database
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://frozen-everglades-38727.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        const countProducts = productKeys.map((k) => {
          const product = fakeData.find((prod) => prod.key === k);
          product.quantity = savedCart[k];
          return product;
        });
        setCart(countProducts);
      });
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
        <button className="cart-button" onClick={handleProceedCheckout}>
          Proceed Checkout
        </button>
      </Cart>
    </div>
  );
};

export default Review;

//  //load data from local storage
//  useEffect(() => {
//   const savedCart = getDatabaseCart();
//   const productKeys = Object.keys(savedCart);
//   const countProducts = productKeys.map((k) => {
//     const product = fakeData.find((prod) => prod.key === k);
//     product.quantity = savedCart[k];
//     return product;
//   });
//   setCart(countProducts);
// }, []);
