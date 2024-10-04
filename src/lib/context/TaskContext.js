"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "../axiosInstance";
import { useAuth } from "./Auth.context";

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component to wrap your application
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const axios = useAxios();
  const { session } = useAuth();

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks", {
        headers: { Authorization: `${session}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (!session) return;

    fetchTasks(); // Fetch tasks on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const emptyTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, emptyTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTasks = () => useContext(TaskContext);
