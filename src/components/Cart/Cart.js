import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  console.log(cart); //Here cart is an array
  const totalItemPrice = cart.reduce((total, prod) => total + prod.price, 0); //Applying array.reduce method

  // Setting shipping cost
  let shipping = 0;
  if (totalItemPrice > 35) {
    shipping = 0;
  } else if (totalItemPrice > 15) {
    shipping = 4.99;
  } else if (totalItemPrice > 0) {
    shipping = 12.99;
  }

  let grandTotalPrice = totalItemPrice + shipping;

  const formatNumber = (num) => {
    let precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h4>Order Summary</h4>
      <h5>Items Ordered: {cart.length}</h5>
      <h5>Items: {formatNumber(totalItemPrice)}</h5>
      <h5>Shipping & Handling: {shipping}</h5>
      <h5>Total before tax: {formatNumber(shipping + totalItemPrice)}</h5>
      <h5>Estimated tax: </h5>
      <h5>Order Total : {formatNumber(grandTotalPrice)}</h5>
    </div>
  );
};

export default Cart;
