import React, { createContext, useState, useEffect, useContext } from "react";
import { useAxios } from "../axiosInstance";
import { getToken, setToken, clearToken } from "../server/session";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const getSession = async () => {
      const token = await getToken();
      setSession(token);
    };

    getSession();
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      setSession(response.data.token);
      await setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await clearToken();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
