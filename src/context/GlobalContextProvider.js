import React from "react";
import firebase from "gatsby-plugin-firebase";

const initialState = {
  theme: "light",
};
export const GlobalContext = React.createContext(initialState);
//export const GlobalStateContext = React.createContext();
//export const GlobalDispatchContext = React.createContext();
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    }
    default:
      throw new Error("bad action type");
  }
}

const GlobalContextProvider = ({ children }) => {
  const [a, setA] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  function toggleTheme() {
    dispatch({
      type: "TOGGLE_THEME",
    });
    return console.log("toggleTheme Function");
  }

  //firebase authentication

  const googleLogin = () => {
    const baseProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(baseProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user", user.uid);
        setA(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <GlobalContext.Provider
      value={{ theme: state.theme, toggleTheme, googleLogin, a, setA }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
