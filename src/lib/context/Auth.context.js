"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useAxios } from "../axiosInstance";
import { getToken, setToken, clearToken } from "../server/session";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const axios = useAxios();
  const { toast } = useToast();

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
      toast({ description: "Log In Successfull ✅" });
    } catch (error) {
      console.error("Error logging in:", error);
      toast({ description: "Log In Failed ❌" });
    }
  };

  const logout = async () => {
    try {
      await clearToken();
      setSession(null);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
