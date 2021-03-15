import React from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
function Layout({ children }) {
  const { theme, toggleTheme, googleLogin } = React.useContext(GlobalContext);

  return (
    <div>
      {/*
      <button
        onClick={async () => {
          return await toggleTheme();
        }}
      >
        Toogle
      </button>
      */}
      {children}
    </div>
  );
}
export default Layout;
