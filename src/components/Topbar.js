"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/lib/store/hooks";
import { useAppSelector } from "@/lib/store/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "../lib/context/TaskContext";
import { ModeToggle } from "./ui/mode-toggle";

export default function Topbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const { fetchTasks, emptyTasks } = useTasks();
  const [token, setToken] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchTasks(); // Fetch tasks on first render
    } else {
      router.push("/");
    }
  }, [router, token]);

  const handleLogout = () => {
    toast({ description: "Logging Out... 🔙" });
    localStorage.removeItem("token");
    dispatch(logout());
    emptyTasks(); // empty the tasks in context
    toast({
      description: "You’ve successfully logged out. See you next time! 😊",
    });
    router.push("/auth/login");
  };

  return (
    <header className="w-full h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md border-b border-gray-600 backdrop-blur-lg">
      <Link href="/" className="text-xl font-bold">
        To-Do Done 📝
      </Link>

      <div className="hidden lg:flex items-center space-x-4">
        <ModeToggle />
        {isAuthenticated ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="block lg:hidden ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>☰</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ModeToggle />
            {isAuthenticated ? (
              <>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
