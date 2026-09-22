import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, profileRequest, logoutRequest } from "../api/auth";

/* import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
 import Cookies from "js-cookie";*/

const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // mantener sesión (localStorage)
  /*useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);*/

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await loginRequest({ email, password });

      setUser(res.data);

      setIsAuthenticated(true);

      return res.data;
      // localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);

      setIsAuthenticated(false);

      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      //  setUser(null);
      // localStorage.removeItem("user");

      await logoutRequest();

      setUser(null);

      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  // VERIFICAR SESIÓN
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await profileRequest();

        setUser(res.data);

        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
