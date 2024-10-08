"use client";

import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

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

export default FeatureCarousel;
