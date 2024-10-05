"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, List, Clock, Share2 } from "lucide-react";
import { useAuth } from "@/lib/context/Auth.context";

export default function Home() {
  const { session } = useAuth();

  return (
    <div className="flex justify-center items-center py-20">
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Simplify Your Day</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Organize, prioritize, and accomplish your tasks with ease using
            To-Do Done.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {[
            {
              icon: CheckCircle,
              title: "Stay Organized",
              description: "Keep all your tasks in one place",
            },
            {
              icon: List,
              title: "Prioritize",
              description: "Focus on what matters most",
            },
            {
              icon: Clock,
              title: "Never Miss a Deadline",
              description: "Set reminders for important tasks",
            },
            {
              icon: Share2,
              title: "Collaborate",
              description: "Share lists with friends and colleagues",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-gray-800" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to boost your productivity?
          </h2>
          {session ? (
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-4">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8 py-4">
                  Sign Up for Free
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
