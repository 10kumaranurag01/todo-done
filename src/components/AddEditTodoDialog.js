"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DatePicker from "./TodoCard/DatePicker";
import PrioritySelector from "./TodoCard/PrioritySelector";
import StatusSelector from "./TodoCard/StatusSelector";
import Image from "next/image";
import editIcon from "../assets/icons8-edit.svg";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "../lib/context/TaskContext";
import { useAxios } from "@/lib/axiosInstance";
import { FaGoogle, FaApple } from "react-icons/fa";
import { createEvent } from "ics";

const initialTodoState = {
  title: "",
  description: "",
  status: "",
  dueDate: null,
  priority: "",
};

const AddEditTodoDialog = ({ todo, btnText }) => {
  const [todoData, setTodoData] = useState(initialTodoState);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { fetchTasks } = useTasks();
  const axios = useAxios();

  useEffect(() => {
    if (todo) {
      const { _id, ...rest } = todo;
      setTodoData(rest);
    }
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { title, description, status, dueDate, priority } = todoData;
    if (!title || !description || !status || !dueDate || !priority) {
      toast({ description: "All fields are required 🙁" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint = todo ? `api/tasks/${todo._id}` : "/api/tasks";
      const method = todo ? "put" : "post";

      await axios[method](endpoint, todoData, {
        headers: { Authorization: `${token}` },
      });

      toast({
        description: `Todo ${todo ? "updated" : "created"} successfully 😊`,
      });
      fetchTasks();
    } catch (error) {
      toast({
        description: `Error ${todo ? "updating" : "creating"} todo: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setTodoData(todo ? { ...todo } : initialTodoState);
  };

  const formatDate = (date) => {
    return (
      new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    );
  };

  const handleAddToCalendar = (calendarType) => {
    const { title, description, dueDate } = todoData;
    const formattedDate = formatDate(dueDate);

    if (calendarType === "google") {
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(description)}`;
      window.open(url, "_blank");
    } else if (calendarType === "apple") {
      const event = {
        title,
        description,
        start: [
          dueDate.getFullYear(),
          dueDate.getMonth() + 1,
          dueDate.getDate(),
        ],
        duration: { hours: 1 },
      };

      createEvent(event, (error, value) => {
        if (error) {
          toast({
            description: `Error creating Apple Calendar event: ${error.message}`,
          });
          return;
        }
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "event.ics";
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
      <DialogTrigger asChild>
        <Button variant={btnText === "Add Todo" ? "secondary" : "ghost"}>
          {btnText === "Add Todo" ? (
            "Add To Do"
          ) : (
            <Image src={editIcon} alt="Edit" width={16} height={16} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-11/12 sm:max-w-[425px] bg-[#0a0a0a] border-gray-500">
        <DialogHeader>
          <DialogTitle>
            {btnText === "Add Todo" ? "Add To Do" : "Edit To Do"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your To-Do here. Click{" "}
            {btnText === "Add Todo" ? "add" : "edit"} when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            name="title"
            placeholder="Task Title"
            value={todoData.title}
            onChange={handleInputChange}
            className="w-full"
          />
          <Input
            name="description"
            placeholder="Task Description"
            value={todoData.description}
            onChange={handleInputChange}
            className="w-full"
          />
          <StatusSelector
            setStatus={(status) => setTodoData((prev) => ({ ...prev, status }))}
            status={todoData.status}
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <DatePicker
              setDueDate={(dueDate) =>
                setTodoData((prev) => ({ ...prev, dueDate }))
              }
              dueDate={todoData.dueDate}
              className="w-full sm:w-auto"
            />
            <PrioritySelector
              setPriority={(priority) =>
                setTodoData((prev) => ({ ...prev, priority }))
              }
              priority={todoData.priority}
              className="w-full sm:w-auto"
            />
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={() => handleAddToCalendar("google")}
                className="w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <FaGoogle className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                onClick={() => handleAddToCalendar("apple")}
                className="w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <FaApple className="h-5 w-5" />
              </Button>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading
                ? "Processing..."
                : btnText === "Add Todo"
                  ? "Add"
                  : "Edit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTodoDialog;
