import { useState } from 'react'
import TodoCard from '../TodoCard/TodoCard'
import TopBar from './TopBar';
import { useToast } from "@/hooks/use-toast"

const TodosList = ({ tasks }) => {
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const { toast } = useToast()

    const handleResetFilters = () => {
        setPriority('');
        setStatus('');
        setDueDate('');
        toast({ description: "Filters reset 👍🏼" });
    }

    const filteredTasks = tasks.filter((todo) => {
        const matchesPriority = priority ? todo.priority === priority : true;
        const matchesStatus = status ? todo.status === status : true;
        const matchesDueDate = dueDate ? new Date(todo.dueDate).toDateString() === new Date(dueDate).toDateString() : true;

        return matchesPriority && matchesStatus && matchesDueDate;
    });

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl mb-4 w-56 font-semibold"># All To-Dos</h1>
            <TopBar priority={priority} setPriority={setPriority} setStatus={setStatus} status={status} setDueDate={setDueDate} dueDate={dueDate} handleResetFilters={handleResetFilters} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                {filteredTasks.map((todo, i) => (
                    <TodoCard todo={todo} key={i} />
                ))}
            </div>
        </div>
    )
}

export default TodosList
