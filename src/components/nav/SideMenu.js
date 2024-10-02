import { Button } from "@/components/ui/button";

const SideMenu = ({ selectedPage, setSelectedPage, isMobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <div className="hidden border-r lg:block mt-16 border-gray-600">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <nav className="grid items-start px-1 text-sm font-medium lg:px-4 mt-4 ">
                    <Button
                        className={`w-full text-left py-2 px-4 `}
                        variant={`${selectedPage === 'todos' ? 'secondary' : 'default'}`}
                        onClick={() => setSelectedPage('todos')}
                    >
                        # To-Dos List
                    </Button>
                    <Button
                        className={`w-full text-left py-2 px-4 mt-2`}
                        variant={`${selectedPage === 'kanban' ? 'secondary' : 'default'}`}
                        onClick={() => setSelectedPage('kanban')}
                    >
                        # Kanban Board
                    </Button>
                </nav>
            </div>
        </div>
    )
}

export default SideMenu
