import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNav = ({ selectedPage, setSelectedPage, isMobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <header className="flex h-14 items-center gap-4 h-50 px-4 lg:h-[60px] lg:px-6 mt-16">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col border-gray-600">
                    <nav className="grid gap-2 text-lg font-medium mt-14">
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
                </SheetContent>
            </Sheet>
        </header>
    )
}

export default MobileNav
