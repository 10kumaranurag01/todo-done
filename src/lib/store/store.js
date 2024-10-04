import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import todoReducer from "./features/todo/todoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      todo: todoReducer,
    },
  });
};
