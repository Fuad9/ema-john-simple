import React, { useState, useEffect } from "react";
import fakeData from "../../fakeData";
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
  const firstTen = fakeData.slice(0, 10);
  const [products] = useState(firstTen);
  // console.log(fakeData);

  // Shopping Cart
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const countProducts = productKeys.map((prodkey) => {
      const product = fakeData.find((prod) => prod.key === prodkey);
      product.quantity = savedCart[prodkey];
      return product;
    });
    setCart(countProducts);
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
