"use client"

import { useState } from 'react';

import { useTasks } from '../../lib/context/TaskContext';
import TodosList from '@/components/TodoList/TodosList';
import SideMenu from '@/components/nav/SideMenu';
import MobileNav from '@/components/nav/MobileNav';
import KanbanBoard from '@/components/Kanban/KanbanBoard';

export default function Dashboard() {
    const { tasks } = useTasks();
    const [selectedPage, setSelectedPage] = useState('todos');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SideMenu selectedPage={selectedPage} setSelectedPage={setSelectedPage} isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <div>
                <MobileNav selectedPage={selectedPage} setSelectedPage={setSelectedPage} isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
                    {selectedPage === 'todos' && <TodosList tasks={tasks} />}
                    {selectedPage === 'kanban' && <KanbanBoard initTasks={tasks} />}
                </main>
            </div>
        </div>
    );
}
