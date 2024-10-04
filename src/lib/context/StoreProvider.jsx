"use client";

import { setAuth, logout } from "@/lib/store/features/auth/authSlice";
import {
  addTodo,
  removeTodo,
  updateTodo,
} from "@/lib/store/features/todo/todoSlice";
import { makeStore } from "@/lib/store/store";
import React, { useRef, useEffect } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      storeRef.current.dispatch(setAuth());
    }
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
