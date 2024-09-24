import { useDraggable, MouseSensor, TouchSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";

const KanbanCard = ({ task }) => {
    const formattedDate = formatDate(task.dueDate);

    // Configure sensors to handle mouse, touch, and pointer events
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 10, // Drag starts after moving 10 pixels
                tolerance: 5, // Allow up to 5 pixels of movement during delay
            },
        }),
        useSensor(PointerSensor) // Ensure mobile pointer events are handled
    );

    const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
        id: task._id,
        sensors, // Pass configured sensors
    });

    // Style object to handle dragging and positioning
    const style = {
        transform: transform ? CSS.Translate.toString(transform) : 'none',
        position: isDragging ? 'absolute' : 'relative',
        zIndex: isDragging ? 1000 : 'auto',
    };

    return (
        <Card
            key={task._id}
            ref={setNodeRef} // Attach ref for drag-and-drop
            {...listeners} // Attach listeners for drag interaction
            {...attributes} // Attach attributes for accessibility
            className={`dark relative mb-4 p-4 shadow-lg rounded-lg transition-all duration-300 
            ${isDragging ? 'opacity-50 scale-105' : ''} 
            sm:p-3 sm:mb-3 md:p-4 md:mb-4 lg:p-5 lg:mb-5 touch-manipulation`} // Use touch-manipulation class
            style={style}
        >
            <CardHeader className="p-2">
                <CardTitle
                    className="text-lg font-semibold sm:text-base md:text-lg lg:text-xl truncate"
                    title={task.title} // Show full text on hover
                >
                    {task.title}
                </CardTitle>
                <CardDescription
                    className="text-sm sm:text-xs md:text-sm truncate"
                    title={task.description} // Show full text on hover
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
