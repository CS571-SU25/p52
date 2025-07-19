import React, { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const storeUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem("user"));
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("user")) || null);

  const login = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
