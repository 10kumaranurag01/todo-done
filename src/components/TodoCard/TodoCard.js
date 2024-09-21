import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AddEditTodoDialog from "../AddEditTodoDialog"
import { useTasks } from '../../lib/context/TaskContext';
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import DeleteTodo from "./DeleteTodo";

const TodoCard = ({ todo }) => {
    const TodoIsoDate = todo.dueDate
    const date = new Date(TodoIsoDate)
    const { fetchTasks } = useTasks();
    const { toast } = useToast()
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    // Helper function to get the ordinal suffix for the day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name
    const year = date.getFullYear();

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;

    const handleDelete = async () => {

        try {
            toast({ description: "Deleting Todo... 🫸🏻" })
            const token = localStorage.getItem("token");
            const todoId = todo._id;

            await axios.delete(`${BASE_URL}/api/tasks/${todoId}`, {
                headers: { Authorization: `${token}` },

            });
        } catch (error) {
            toast({ description: "Oops! Something went wrong 🙁" })
        } finally {
            fetchTasks();
            toast({ description: "Done 😊" })
        }
    };

    return (
        <Card key={todo._id} className="dark relative ">
            <div className="absolute top-2 right-2">
                <AddEditTodoDialog btnText={"Edit Todo"} todo={todo} />
                <DeleteTodo handleDelete={handleDelete} />
            </div>
            <CardHeader>
                <CardTitle>{todo.title}</CardTitle>
                <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pl-6 pt-0">
                <p className="font-semibold text-sm">📅 {formattedDate}</p>
            </CardContent>
            <CardFooter className="flex gap-4">
                <p className={`mt-2 text-sm font-semibold ${todo.status === 'Completed'
                    ? 'text-green-600 bg-transparent'
                    : todo.status === 'In Progress'
                        ? ' text-yellow-500 bg-transparent'
                        : 'text-red-600 bg-transparent'
                    }`}>{todo.status}</p>
                <p
                    className={`mt-2 text-sm font-semibold ${todo.priority === 'High'
                        ? 'text-red-600 bg-transparent'
                        : todo.priority === 'Medium'
                            ? 'text-yellow-500 bg-transparent'
                            : 'text-green-600 bg-transparent'
                        }`}>{todo.priority}</p>
            </CardFooter>
        </Card>

    )
}

export default TodoCard
