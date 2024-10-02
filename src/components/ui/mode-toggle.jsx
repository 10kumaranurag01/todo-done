"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { Button } from "./button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderToggle = () => (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </div>
  );

  return renderToggle();
}
