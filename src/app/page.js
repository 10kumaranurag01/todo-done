"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { useAuth } from "@/lib/context/Auth.context";
import { useTheme } from "next-themes";
import FeatureCarousel from "@/components/FeatureCarousel";

const LandingPage = () => {
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
};

export default LandingPage;
