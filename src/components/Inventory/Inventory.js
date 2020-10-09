import React, { useState } from "react";
import { useForm } from "react-hook-form";
import fakedata from "../../fakeData/index";

const Inventory = () => {
  // this will be admin panel page. where I can add, update and delete products from database

  const { register, handleSubmit } = useForm();

  const [key, setKey] = useState({ key: "" });
  const [category, setCategory] = useState({ category: "" });
  const [name, setName] = useState({ name: "" });
  const [seller, setSeller] = useState({ seller: "" });
  const [wholePrice, setWholePrice] = useState({ wholePrice: "" });
  const [priceFraction, setPrice] = useState({ priceFraction: "" });
  const [shipping, setShipping] = useState({ shipping: "" });
  const [stock, setStock] = useState({ stock: "" });
  const [star, setStar] = useState({ star: "" });
  const [starCount, setStarCount] = useState({ starCount: "" });
  const [img, setImg] = useState({ img: "" });
  const [url, setUrl] = useState({ url: "" });

  const handleKey = (e) => {
    const newKey = { ...key };
    newKey.key = e.target.value;
    setKey(newKey);
  };
  const handleCategory = (e) => {
    const newCategory = { ...category };
    newCategory.category = e.target.value;
    setCategory(newCategory);
  };
  const handleName = (e) => {
    const newName = { ...name };
    newName.name = e.target.value;
    setName(newName);
  };
  const handleSeller = (e) => {
    const newSeller = { ...seller };
    newSeller.seller = e.target.value;
    setSeller(newSeller);
  };
  const handleWholePrice = (e) => {
    const newwholePrice = { ...wholePrice };
    newwholePrice.wholePrice = e.target.value;
    setWholePrice(newwholePrice);
  };
  const handlePriceFraction = (e) => {
    const newpriceFraction = { ...priceFraction };
    newpriceFraction.priceFraction = e.target.value;
    setPrice(newpriceFraction);
  };
  const handleShipping = (e) => {
    const newShipping = { ...shipping };
    newShipping.shipping = e.target.value;
    setShipping(newShipping);
  };
  const handleStock = (e) => {
    const newStock = { ...stock };
    newStock.stock = e.target.value;
    setStock(newStock);
  };
  const handleStar = (e) => {
    const newstar = { ...star };
    newstar.star = e.target.value;
    setStar(newstar);
  };
  const handleStarCount = (e) => {
    const newstarCount = { ...starCount };
    newstarCount.starCount = e.target.value;
    setStarCount(newstarCount);
  };
  const handleImg = (e) => {
    const newImg = { ...img };
    newImg.img = e.target.value;
    setImg(newImg);
  };
  const handleUrl = (e) => {
    const newUrl = { ...url };
    newUrl.name = e.target.value;
    setUrl(newUrl);
  };

  // console.log(products);

  // to add single product
  const onSubmit = () => {
    const newProducts = {
      ...key,
      ...category,
      ...name,
      ...seller,
      ...wholePrice,
      ...priceFraction,
      ...shipping,
      ...stock,
      ...star,
      ...starCount,
      ...img,
      ...url,
    };

    fetch("https://frozen-everglades-38727.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProducts),
    });
  };

  const onSubmitta = () => {
    // const prodKey = { key };
    // console.log(prodKey);
    const products = { key, category, name };

    const productKey = products.key.key;

    fetch(
      `https://frozen-everglades-38727.herokuapp.com/update/${productKey}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <form className="inventory-form" onSubmit={handleSubmit(onSubmitta)}>
        <p>
          <span>Name: </span>
          <input
            name="name"
            type="text"
            onBlur={handleName}
            ref={register({ required: true })}
            placeholder="Enter Your Product Name"
          />
        </p>
        <p>
          <span>Price: </span>
          <input
            name="price"
            type="text"
            onChange={handleWholePrice}
            ref={register({ required: true })}
            placeholder="Enter Your Product Price"
          />
        </p>
        <p>
          <span>Image: </span>
          <input
            name="image"
            type="url"
            onChange={handleImg}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Key: </span>
          <input
            name="key"
            type="text"
            onChange={handleKey}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Category: </span>
          <input
            name="category"
            type="text"
            onChange={handleCategory}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Seller: </span>
          <input
            name="seller"
            type="text"
            onChange={handleSeller}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>PriceFraction: </span>
          <input
            name="pricefraction"
            type="text"
            onChange={handlePriceFraction}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Shipping: </span>
          <input
            name="shipping"
            type="text"
            onChange={handleShipping}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Stock: </span>
          <input
            name="image"
            type="text"
            onChange={handleStock}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Star: </span>
          <input
            name="image"
            type="text"
            onChange={handleStar}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>StarCount: </span>
          <input
            name="image"
            type="text"
            onChange={handleStarCount}
            ref={register({ required: true })}
            placeholder="Insert Your Product Image"
          />
        </p>
        <p>
          <span>Url: </span>
          <input
            name="image"
            type="url"
            onChange={handleUrl}
            placeholder="Insert Your Product Image"
          />
        </p>
        <button type="submit">Add Product</button>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
