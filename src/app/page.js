"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useTasks } from '../lib/context/TaskContext';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState(null);
  const { fetchTasks } = useTasks();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchTasks();
    } else {
      setToken(null)
    }
  }, [router])

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="text-2xl font-semibold">
        To-Do Done
      </div>
      <div className="flex justify-center mt-4">
        {token ? (
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        ) : (
          <div className='flex justify-center items-center gap-2'>
            <Link href="/auth/login">
              <Button variant="default">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
