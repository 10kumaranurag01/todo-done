"use client"

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from 'axios';

export default function Kanban() {
    const [tasks, setTasks] = useState({ toDo: [], inProgress: [], completed: [] });

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const groupedTasks = {
                toDo: response.data.filter((task) => task.status === 'To Do'),
                inProgress: response.data.filter((task) => task.status === 'In Progress'),
                completed: response.data.filter((task) => task.status === 'Completed'),
            };
            setTasks(groupedTasks);
        };

        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl mb-4">Kanban Board</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['toDo', 'inProgress', 'completed'].map((status) => (
                    <div key={status} className="bg-gray-200 p-4 rounded-md">
                        <h2 className="text-xl mb-2 capitalize">{status.replace(/([A-Z])/g, ' $1')}</h2>
                        {tasks[status].map((task) => (
                            <Card key={task._id} className="mb-4 p-4">
                                <h3 className="text-lg">{task.title}</h3>
                                <p>{task.description}</p>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
