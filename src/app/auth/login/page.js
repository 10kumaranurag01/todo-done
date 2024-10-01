"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from '@/lib/store/hooks'
import { setAuth } from "@/lib/store/features/auth/authSlice"
import { useTasks } from '../../../lib/context/TaskContext';
import { useState } from "react"

const loginSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function LoginPage() {
    const router = useRouter()
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    const { fetchTasks } = useTasks();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [loginstatus, Setloginstatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
        try {
            toast({ description: "Logging In... 🫸🏻"})
            const response = await axios.post(`${BASE_URL}/api/auth/login`, data)
            localStorage.setItem("token", response.data.token)
            toast({ description: "Log In Successfull ✅", variant: "default" })
            dispatch(setAuth())
            fetchTasks()
            router.push("/dashboard")
        } catch (error) {
            toast({ description: "Log In Failed ❌", variant: "destructive" })
            Setloginstatus(true);
        }
    }

    const handelRegister = () => {
        router.push("/auth/register")
    }

    return (
        <div className="flex justify-center items-center h-[95vh] dark">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>Log in to unlock your productivity! 💪</CardDescription>
                </CardHeader>
                <CardContent>
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col space-y-3">
                            <Button type="submit">Login</Button>
                            {loginstatus && (
    <>
      <p className="mt-4 text-xs text-center text-gray-500">Don't have an account? Register by clicking below</p>
      <Button type="button" variant="secondary" onClick={handelRegister}>
        Register
      </Button>
    </>
  )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
