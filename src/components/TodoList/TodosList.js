import { useState, useEffect } from "react";
import TodoCard from "../TodoCard/TodoCard";
import TopBar from "./TopBar";
import { useToast } from "@/hooks/use-toast";

const TodosList = ({ tasks }) => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleResetFilters = () => {
    setPriority("");
    setStatus("");
    setDueDate("");
    setSearchTerm("");
    toast({ description: "Filters reset 👍🏼" });
  };

  const filteredTasks = tasks.filter((todo) => {
    const matchesPriority = priority ? todo.priority === priority : true;
    const matchesStatus = status ? todo.status === status : true;
    const matchesDueDate = dueDate
      ? new Date(todo.dueDate).toDateString() ===
        new Date(dueDate).toDateString()
      : true;
    const matchesSearchTerm = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesPriority && matchesStatus && matchesDueDate && matchesSearchTerm
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4 w-56 font-semibold"># All To-Dos</h1>
      <TopBar
        priority={priority}
        setPriority={setPriority}
        setStatus={setStatus}
        status={status}
        setDueDate={setDueDate}
        dueDate={dueDate}
        handleResetFilters={handleResetFilters}
      />
      <div className="relative mb-4 mt-3 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]">
        <input
          type="text"
          placeholder="Search Todos..."
          className="p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black w-full h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {filteredTasks.map((todo, i) => (
          <TodoCard todo={todo} key={i} />
        ))}
      </div>
    </div>
  );
};

export default TodosList;
