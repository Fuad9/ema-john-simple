import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../components/Login/firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

// // Google Sign in Method with redirect
// export const handleGoogleSignIn = () => {
//   const googleProvider = new firebase.auth.GoogleAuthProvider();
//   return firebase
//     .auth()
//     .getRedirectResult()
//     .then((res) => {
//       if (!res.user) {
//         firebase.auth().signInWithRedirect(googleProvider);
//       } else {
//         const { displayName, photoURL, email } = res.user;
//         const signedInUser = {
//           isSignedIn: true,
//           name: displayName,
//           email: email,
//           photo: photoURL,
//         };
//         return signedInUser;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log(error.message);
//     });
// };

// Google Sign in Method with popup
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      setUserToken();
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// to configure JWT
const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(function (idToken) {
      sessionStorage.setItem("userToken", idToken);
    })
    .catch(function (error) {
      // Handle error
    });
};

//Facebook sign in method with popup
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      const token = res.credential.accessToken;
      // const user = res.user;
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

// to sign out
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

// to create new user
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      updateUserInfo(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

//to sign in user
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// to update user info
const updateUserInfo = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("user updated successfully");
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
