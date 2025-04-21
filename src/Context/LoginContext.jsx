import { createContext } from "react";
import { useState, useEffect } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [loginState, setLoginState] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);

  // useEffect(() => {
  //   // localStorage se user data lo
  //   const email = localStorage.getItem("userEmail");
  //   const type = localStorage.getItem("userType");
  //   const name = localStorage.getItem("userName");
  //   setUserEmail(email);
  //   setUserType(type);
  //   setUserName(name);
  //   setLoginState(true);
  // }, []);

  return (
    <LoginContext.Provider
      value={{
        loginState,
        setLoginState,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        userType,
        setUserType,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
