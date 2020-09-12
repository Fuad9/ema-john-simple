import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  //   using context api from parent app.js
  const [loggeInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // to sign in user via google
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  //to sign in user via facebook
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  // to sign out user from google
  const googleSignOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  // // to sign out user from facebook
  // const fbSignOut = () => {
  //   handleSignOut().then((res) => {
  //     setUser(res);
  //     setLoggedInUser(res);
  //   });
  // };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      const isEmailValid = /^[a-z0-9._]+@gmail\.com$/.test(e.target.value);
      isFieldValid = isEmailValid;
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passWordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {user.isSignedIn ? (
          <button onClick={googleSignOut}>Sign out</button>
        ) : (
          <button onClick={googleSignIn}>Sign in</button>
        )}
        {user.isSignedIn ? (
          <button onClick={googleSignOut}>Sign out</button>
        ) : (
          <button onClick={fbSignIn}>Sign in using Facebook</button>
        )}
      </div>
      {user.isSignedIn && (
        <>
          <h4>Welcome! {user.name}</h4>
          <h4>Email: {user.email}</h4>
          <img style={{ width: "100px" }} src={user.photo} alt="" />
        </>
      )}

      <h1>Our own authentication</h1>
      <input
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">Sign up for new user</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onBlur={handleBlur}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onBlur={handleBlur}
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <h5 style={{ color: "red" }}>{user.error}</h5>
      {user.success && (
        <h5 style={{ color: "green" }}>
          User {newUser ? "Created" : "logged in"} Successfully
        </h5>
      )}
    </div>
  );
}

export default Login;
