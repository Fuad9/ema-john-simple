import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import fakeData from "../../fakeData";

const ProductDetails = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  // const product = fakeData.find((prod) => prod.key === productKey);

  useEffect(() => {
    fetch("https://frozen-everglades-38727.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  return (
    <div>
      <h1>Your Product Details Here</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;
