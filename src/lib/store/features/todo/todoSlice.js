import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [], // Array to hold the to-do items
  },
  reducers: {
    addTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...updates };
      }
    },
  },
});

export const { addTodos, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
