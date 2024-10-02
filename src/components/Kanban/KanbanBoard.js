"use client";

import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { useTasks } from '../../lib/context/TaskContext';
import PopOverTooltip from './PopOverTooltip';
import { useToast } from "@/hooks/use-toast"
import { useAxios } from '@/lib/axiosInstance';

const KanbanBoard = () => {
    const [sortedTasks, setSortedTasks] = useState({
        todo: [],
        inProgress: [],
        completed: [],
    });
    const { tasks, fetchTasks } = useTasks();
    const { toast } = useToast()
    const axios = useAxios()

    useEffect(() => {
        const filterTasks = async () => {
            const taskState = {
                todo: tasks.filter(task => task.status === 'To Do'),
                inProgress: tasks.filter(task => task.status === 'In Progress'),
                completed: tasks.filter(task => task.status === 'Completed')
            };
            setSortedTasks(taskState);
        };

        filterTasks();
    }, [tasks]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            toast({ description: "Changing status... 🔁" })
            const sourceColumn = Object.keys(sortedTasks).find(column =>
                sortedTasks[column].some(task => task._id === active.id)
            );
            const destinationColumn = over.id;

            // Ensure both source and destination columns exist
            if (!sourceColumn || !destinationColumn) {
                return; // Exit if columns are invalid
            }

            const updatedTasks = { ...sortedTasks };
            const movedTask = updatedTasks[sourceColumn].find(task => task._id === active.id);

            // Remove the task from the source column
            updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(task => task._id !== active.id);

            // Update status immediately
            movedTask.status = destinationColumn;

            // Add the task to the destination column
            if (updatedTasks[destinationColumn]) {
                updatedTasks[destinationColumn].push(movedTask);
            }

            const originalTasks = { ...sortedTasks };// Store original state

            // Update the state immediately to reflect the change in UI
            setSortedTasks(updatedTasks);

            try {
                // Update task status in the backend
                await updateTaskStatusInDB(movedTask);
            } catch (error) {
                console.error("Failed to update task status in the backend:", error);
                setSortedTasks(originalTasks); // Revert back to original state
            }
        }
    };

    const updateTaskStatusInDB = async (movedTask) => {
        const token = localStorage.getItem("token");
        const payload = {
            title: movedTask.title,
            description: movedTask.description,
            status: movedTask.status,
            priority: movedTask.priority,
            dueDate: movedTask.dueDate
        }
        try {
            await axios.put(`/api/tasks/${movedTask._id}`, payload, {
                headers: { Authorization: `${token}` },
            });
        } catch (error) {
            toast({ description: `Failed while changing status to ${movedTask.status} ❌` });
        } finally {
            fetchTasks();
            toast({ description: `Changed status to ${movedTask.status} ✅` });
        }
    };

    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-3xl mb-4 w-60 font-semibold"># Kanban Board</h1>
                <div className='mb-4 border rounded-3xl p-1'>
                    <PopOverTooltip />
                </div>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <KanbanColumn status="To Do" tasks={sortedTasks.todo} />
                    <KanbanColumn status="In Progress" tasks={sortedTasks.inProgress} />
                    <KanbanColumn status="Completed" tasks={sortedTasks.completed} />
                </div>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
