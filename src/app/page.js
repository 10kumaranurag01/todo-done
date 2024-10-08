"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Edit3,
  Layout,
  RefreshCw,
  Smartphone,
  MessageSquare,
  Lock,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";
import { useAuth } from "@/lib/context/Auth.context";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTheme } from "next-themes";

const features = [
  {
    name: "Create, Edit, Delete Todos",
    description:
      "Add tasks, edit them as needed, and remove completed or obsolete tasks.",
    icon: Edit3,
  },
  {
    name: "Drag-and-Drop Kanban Board",
    description:
      "Seamlessly move tasks between columns like 'To Do', 'In Progress', and 'Done' using DnD Kit.",
    icon: Layout,
  },
  {
    name: "Real-Time Updates",
    description: "Task statuses are updated dynamically across the UI.",
    icon: RefreshCw,
  },
  {
    name: "Responsive Design",
    description: "Optimized for mobile and desktop views using Tailwind CSS.",
    icon: Smartphone,
  },
  {
    name: "Dialog Components",
    description: "Easy form interactions with dialog boxes built using ShadCN.",
    icon: MessageSquare,
  },
  {
    name: "Authentication",
    description: "Secure login with JWT and bcrypt.",
    icon: Lock,
  },
];

const FeatureCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    );
    return () => emblaApi.off("select", () => {});
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-50 dark:bg-black -z-10" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-hidden py-8" ref={emblaRef}>
          <div className="flex">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mx-4"
                >
                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-8 h-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                      <feature.icon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { session } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200">
      <main className="relative">
        <div className="px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:text-6xl">
                Simplify Your Day with
                <span className="block text-primary">To-Do Done</span>
              </h1>
              <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Organize, prioritize, and accomplish your tasks with ease using
                our powerful task management platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {session ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 rounded-full shadow-lg shadow-gray-400 dark:shadow-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Go to Dashboard
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/register">
                      <Button
                        size="lg"
                        className="text-lg px-8 py-6 rounded-full shadow-lg shadow-gray-400 dark:shadow-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                      >
                        Get Started
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                      >
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </div>

        {/* Features section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-20 bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold sm:text-4xl mb-4"
              >
                Everything You Need
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl mb-16 text-gray-600 dark:text-gray-300"
              >
                Discover all the powerful features that make To-Do Done the
                perfect choice
              </motion.p>
            </div>

            <FeatureCarousel />
          </div>
        </motion.section>

        {/* Call to action section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-20 bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl mb-8">
              Ready to boost your productivity?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Join thousands of users who have transformed their task management
              with To-Do Done.
            </p>
            {!session && (
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-lg shadow-gray-400 dark:shadow-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Start For Free
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
