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
import DeleteTodo from "./DeleteTodo";
import { formatDate } from "@/utils/formatDate";
import { useAxios } from "@/lib/axiosInstance";

const TodoCard = ({ todo }) => {
    const { fetchTasks } = useTasks();
    const { toast } = useToast()
    const axios = useAxios()
    const formattedDate = formatDate(todo.dueDate)

    const handleDelete = async () => {

        try {
            toast({ description: "Deleting Todo... 🫸🏻" })
            const token = localStorage.getItem("token");
            const todoId = todo._id;

            await axios.delete(`/api/tasks/${todoId}`, {
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
