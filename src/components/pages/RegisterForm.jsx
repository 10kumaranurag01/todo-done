"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "@/utils/validation/registerSchema";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAxios } from "@/lib/axiosInstance";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const axios = useAxios();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      toast({ description: "Signing Up... 🫸🏻" });
      await axios.post("/api/auth/register", data);
      toast({ description: "Log in with your credentials 😊" });
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-2">
          <Button type="submit" className="w-full">
            Register
          </Button>
          <p className="mt-4 text-xs text-center text-balance">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
