import { useDraggable, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const KanbanCard = ({ task }) => {
    // Define sensors for both mouse and touch events
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            // Adjust activation constraints if needed
            activationConstraint: {
                delay: 250, // 250ms delay for touch start
                tolerance: 5,  // 5px movement tolerance
            },
        })
    );

    const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
        id: task._id,
        sensors, // Pass sensors here
    });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : 'none',
        position: isDragging ? 'absolute' : 'relative',
        zIndex: isDragging ? 1000 : 'auto',
    };

    const TodoIsoDate = task.dueDate;
    const date = new Date(TodoIsoDate);

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;

    return (
        <Card
            key={task._id}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`dark relative mb-4 p-4 shadow-lg rounded-lg transition-all duration-300 
            ${isDragging ? 'opacity-50 scale-105' : ''} 
            sm:p-3 sm:mb-3 md:p-4 md:mb-4 lg:p-5 lg:mb-5 touch-manipulation`}
            style={style}
        >
            <CardHeader className="p-2">
                <CardTitle
                    className="text-lg font-semibold sm:text-base md:text-lg lg:text-xl truncate"
                    title={task.title}
                >
                    {task.title}
                </CardTitle>
                <CardDescription
                    className="text-sm sm:text-xs md:text-sm truncate"
                    title={task.description}
                >
                    {task.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pl-2 pt-2">
                <p className="font-semibold text-sm sm:text-xs md:text-sm">📅 {formattedDate}</p>
            </CardContent>
            <CardFooter className="p-2 pt-0 flex gap-4 flex-wrap">
                <p className={`mt-2 text-sm font-semibold sm:text-xs md:text-sm 
                    ${task.status === 'Completed'
                        ? 'text-green-600'
                        : task.status === 'In Progress'
                            ? 'text-yellow-500'
                            : 'text-red-600'}`}>
                    {task.status}
                </p>
                <p className={`mt-2 text-sm font-semibold sm:text-xs md:text-sm 
                    ${task.priority === 'High'
                        ? 'text-red-600'
                        : task.priority === 'Medium'
                            ? 'text-yellow-500'
                            : 'text-green-600'}`}>
                    {task.priority}
                </p>
            </CardFooter>
        </Card>
    );
};

export default KanbanCard;
