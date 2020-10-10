import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop" style={{ textDecoration: "none" }}>
          Shop
        </Link>
        <Link to="/review" style={{ textDecoration: "none" }}>
          Order Review
        </Link>
        <Link to="/inventory" style={{ textDecoration: "none" }}>
          Manage Inventory here
        </Link>
        <button onClick={() => setLoggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
