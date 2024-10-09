"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DatePicker from "./TodoCard/DatePicker";
import PrioritySelector from "./TodoCard/PrioritySelector";
import StatusSelector from "./TodoCard/StatusSelector";
import { useAuth } from "@/lib/context/Auth.context";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "../lib/context/TaskContext";
import { useAxios } from "@/lib/axiosInstance";
import { Plus, EditIcon } from "lucide-react";

export const AddEditTodoDialog = ({ todo, btnText }) => {
  const [initialTodo, setInitialTodo] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: null,
    priority: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const { toast } = useToast();
  const { fetchTasks } = useTasks();
  const axios = useAxios();
  const { session } = useAuth();

  useEffect(() => {
    if (todo) {
      const { _id: id, title, description, status, dueDate, priority } = todo;
      setInitialTodo({ title, description, status, dueDate, priority });
      setTitle(title);
      setDescription(description);
      setStatus(status);
      setDueDate(dueDate);
      setPriority(priority);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //handling re-rendering.
    if (
      title === "" ||
      description === "" ||
      status === "" ||
      dueDate == null ||
      priority === ""
    ) {
      toast({ description: "Try again, all fields are required 🙁" });
      return;
    }

    try {
      toast({ description: "Editing To-Do... 🫸🏻" });
      const todoData = { title, description, status, dueDate, priority };

      if (todo) {
        // Edit todo
        await axios.put(`api/tasks/${todo._id}`, todoData, {
          headers: { Authorization: `${session}` },
        });
      } else {
        // Add new todo
        toast({ description: "Creating To-Do... 🫸🏻" });
        await axios.post("/api/tasks", todoData, {
          headers: { Authorization: `${session}` },
        });
      }
    } catch (error) {
      toast({ description: "Oops ! Something went wrong 🙁" });
    } finally {
      fetchTasks();
      setOpenDialog(false);
      if (btnText === "Add Todo") {
        handleDialogClose();
      }
      toast({ description: "Done 😊" });
    }
  };

  const handleDialogClose = () => {
    // Reset form fields to initial state
    setTitle(initialTodo.title);
    setDescription(initialTodo.description);
    setStatus(initialTodo.status);
    setDueDate(initialTodo.dueDate);
    setPriority(initialTodo.priority);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="w-12 h-12 rounded-full flex justify-center items-center
          bg-black text-white
          dark:bg-white dark:text-black
            hover:bg-[hsl(var(--primary)/90)]
          dark:hover:bg-gray-300"
          onClick={() => setOpenDialog(true)}
          variant={btnText === "Add Todo" ? "secondary" : "ghost"}
          title={btnText === "Add Todo" ? "Add To Do" : "Edit To Do"}
        >
          {btnText === "Add Todo" ? (
            <Plus height={16} width={16} />
          ) : (
            <EditIcon height={16} width={16} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-11/12 sm:max-w-[425px] border-gray-500">
        <DialogHeader>
          <DialogTitle>
            {btnText === "Add Todo" ? "Add To Do" : "Edit To Do"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your To-Do here. Click{" "}
            {btnText === "Add Todo" ? "add" : "edit"} when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="sr-only">
              Task Title
            </label>
            <Input
              id="title"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="sr-only">
              Task Description
            </label>
            <Input
              id="description"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 w-full"
            />
          </div>
          <div>
            <StatusSelector setStatus={setStatus} status={status} />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <DatePicker
              setDueDate={setDueDate}
              dueDate={dueDate}
              className="w-full sm:w-auto"
            />
            <PrioritySelector
              setPriority={setPriority}
              priority={priority}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto"
            >
              {btnText === "Add Todo" ? "Add" : "Edit"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};