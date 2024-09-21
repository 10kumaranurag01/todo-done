import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ status, tasks }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    const [isDraggedOver, setIsDraggedOver] = useState(false);

    // Change column height and background color on drag-over
    const columnClass = `transition-all duration-300 bg-gray-800 p-4 rounded-lg h-full flex flex-col
        ${isOver || isDraggedOver ? 'bg-gray-600' : 'bg-gray-800'}`;

    return (
        <div
            ref={setNodeRef}
            className={columnClass}
            onDragEnter={() => setIsDraggedOver(true)}
            onDragLeave={() => setIsDraggedOver(false)}
        >
            <h2 className="text-lg font-semibold mb-4">{status}</h2>
            <div className="flex-1 overflow-y-auto space-y-4 max-h-[75vh] scrollbar-none">
                {tasks.map((task) => (
                    <KanbanCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
