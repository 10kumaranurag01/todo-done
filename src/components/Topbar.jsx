"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "../lib/context/TaskContext";
import { ModeToggle } from "./ui/mode-toggle";
import { useAuth } from "@/lib/context/Auth.context";
import { useMemo } from "react";
import { Github } from "lucide-react";

export default function Topbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { emptyTasks } = useTasks();
  const { session, logout } = useAuth();
  const isAuthenticated = useMemo(() => !!session, [session]);

  const handleLogout = async () => {
    toast({ description: "Logging Out... 🔙" });
    emptyTasks(); // empty the tasks in context
    await logout();
    toast({
      description: "You've successfully logged out. See you next time! 😊",
    });
  };

  return (
    <header className="w-full h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md border-b border-gray-600 backdrop-blur-lg">
      <Link href="/" className="text-xl font-bold">
        To-Do Done 📝
      </Link>
      <div className="hidden lg:flex items-center space-x-4">
        <ModeToggle />

        {/* GitHub Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              "https://github.com/10kumaranurag01/todo-done",
              "_blank"
            )
          }
          className="w-[110%] px-4 py-2"
        >
          <Github />
        </Button>

        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : null}
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden ml-auto flex space-x-4">
        <ModeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              "https://github.com/10kumaranurag01/todo-done",
              "_blank"
            )
          }
          className="py-2"
        >
          <Github />
        </Button>
        {isAuthenticated ? (
          <Button onClick={handleLogout} className="text-xs">
            Logout
          </Button>
        ) : null}
      </div>
    </header>
  );
}
