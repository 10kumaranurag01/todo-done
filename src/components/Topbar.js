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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[1.2rem] w-[1.2rem]"
          >
            <path
              fillRule="evenodd"
              d="M12 0a12 12 0 00-3.79 23.386c.6.111.819-.261.819-.581 0-.287-.011-1.048-.017-2.057-3.338.724-4.042-1.613-4.042-1.613-.546-1.387-1.334-1.757-1.334-1.757-1.091-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.072 1.836 2.811 1.305 3.498.997.108-.776.419-1.305.762-1.605-2.664-.304-5.466-1.333-5.466-5.93 0-1.31.467-2.38 1.235-3.221-.123-.303-.535-1.526.117-3.18 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.004-.404c1.02.005 2.046.137 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.653 1.654.241 2.877.119 3.18.77.841 1.233 1.911 1.233 3.221 0 4.61-2.805 5.623-5.478 5.92.431.371.815 1.103.815 2.222 0 1.606-.015 2.903-.015 3.297 0 .322.216.697.825.578A12 12 0 0012 0z"
              clipRule="evenodd"
            />
          </svg>
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
          className="w-[50%] px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[1.2rem] w-[3.2rem]"
          >
            <path
              fillRule="evenodd"
              d="M12 0a12 12 0 00-3.79 23.386c.6.111.819-.261.819-.581 0-.287-.011-1.048-.017-2.057-3.338.724-4.042-1.613-4.042-1.613-.546-1.387-1.334-1.757-1.334-1.757-1.091-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.072 1.836 2.811 1.305 3.498.997.108-.776.419-1.305.762-1.605-2.664-.304-5.466-1.333-5.466-5.93 0-1.31.467-2.38 1.235-3.221-.123-.303-.535-1.526.117-3.18 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.004-.404c1.02.005 2.046.137 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.653 1.654.241 2.877.119 3.18.77.841 1.233 1.911 1.233 3.221 0 4.61-2.805 5.623-5.478 5.92.431.371.815 1.103.815 2.222 0 1.606-.015 2.903-.015 3.297 0 .322.216.697.825.578A12 12 0 0012 0z"
              clipRule="evenodd"
            />
          </svg>
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
