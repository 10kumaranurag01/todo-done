"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "../axiosInstance";

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component to wrap your application
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    // Fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/tasks", {
          headers: { Authorization: `${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Fetch tasks on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyTasks = () => {
    console.log("EMPTYYYY");
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
