import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  setToken: (x) => x,
});

const AuthProvider = ({ children }) => {
  let storedAuthData;
  try {
    storedAuthData = JSON.parse(localStorage.getItem("token"));
  } catch {
    storedAuthData = null;
  }
  const [token, setToken] = useState(storedAuthData);

  const contextData = {
    token,
    setToken,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
