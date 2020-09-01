import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import fakeData from "../../fakeData";

const ProductDetails = () => {
  const { productKey } = useParams();
  const product = fakeData.find((prod) => prod.key === productKey);
  return (
    <div>
      <h1>Your Product Details</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;
