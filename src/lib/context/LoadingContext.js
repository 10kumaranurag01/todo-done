"use client";

import { createContext, useContext, useState } from "react";

// Create LoadingContext
const LoadingContext = createContext();

// LoadingProvider component to wrap your application
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, handleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => useContext(LoadingContext);
