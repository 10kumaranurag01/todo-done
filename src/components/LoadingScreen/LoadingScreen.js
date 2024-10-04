"use client";

import { useLoading } from "@/lib/context/LoadingContext";
import { useTheme } from "next-themes";

const LoadingScreen = () => {
  const { isLoading } = useLoading();
  const { theme } = useTheme(); // Get the current theme

  if (!isLoading) return null;

  const backgroundClass = theme === "dark" ? "bg-dark" : "bg-white";
  const secondaryColorClass = theme === "dark" ? "bg-white" : "bg-primary";

  return (
    <div
      className={`${backgroundClass} fixed h-screen left-0 top-0 w-screen z-50`}
    >
      <div
        className={`animate-waterfall_025 ${secondaryColorClass} h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[10px]`}
      />
      <div
        className={`animate-waterfall_05 ${secondaryColorClass} h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 ml-[15px]`}
      />
      <div
        className={`animate-waterfall_075 ${secondaryColorClass} h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[35px]`}
      />
      <div
        className={`animate-waterfall_1 ${secondaryColorClass} h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 ml-[40px]`}
      />
      <div
        className={`animate-waterfall_125 ${secondaryColorClass} h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[60px]`}
      />
    </div>
  );
};

export default LoadingScreen;
