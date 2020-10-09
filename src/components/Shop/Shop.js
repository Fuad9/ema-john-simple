import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  // Show Products
  // const firstTen = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://frozen-everglades-38727.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://frozen-everglades-38727.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  // Click handler
  const handleAddProduct = (prod) => {
    const sameProduct = cart.find((pd) => pd.key === prod.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== prod.key);
      newCart = [...others, sameProduct];
    } else {
      prod.quantity = 1;
      newCart = [...cart, prod];
    }
    setCart(newCart);
    addToDatabaseCart(prod.key, count);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((prod) => (
          <Product
            key={prod.key}
            showAddToCart={true}
            product={prod}
            handleAddProduct={handleAddProduct}
          />
        ))}
      </div>
      <Cart cart={cart}>
        <Link to="/review">
          <button className="cart-button">Review Order</button>
        </Link>
      </Cart>
    </div>
  );
};

export default Shop;
