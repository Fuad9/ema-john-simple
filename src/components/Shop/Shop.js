import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
  // console.log(fakeData);

  // Shopping Cart
  const [cart, setCart] = useState([]);

  // Click handler
  const handleAddProduct = (product) => {
    console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
  };

  // Show Products
  const firstTen = fakeData.slice(0, 10);
  const [products, setProducts] = useState(firstTen);
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product product={product} handleAddProduct={handleAddProduct} />
        ))}
      </div>
      <Cart cart={cart}></Cart>
    </div>
  );
};

export default Shop;
