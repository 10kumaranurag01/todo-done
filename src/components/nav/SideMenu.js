import { Button } from "@/components/ui/button";

const SideMenu = ({
  selectedPage,
  setSelectedPage,
  isMobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <div className="hidden border-r lg:block mt-16 border-gray-600 dark:border-gray-900">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <nav className="grid items-start px-1 text-sm font-medium lg:px-4 mt-4 ">
          <Button
            className={`w-full text-left py-2 px-4 ${selectedPage === "todos" ? "bg-gray-900 text-white dark:bg-gray-850 dark:text-gray-200 dark:hover:bg-gray-800" : "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-550"}`}
            variant="default"
            onClick={() => setSelectedPage("todos")}
          >
            # To-Dos List
          </Button>
          <Button
            className={`w-full text-left py-2 px-4 mt-2 ${selectedPage === "kanban" ? "bg-gray-900 text-white dark:bg-gray-850 dark:text-gray-200 dark:hover:bg-gray-800" : "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-550"}`}
            variant="default"
            onClick={() => setSelectedPage("kanban")}
          >
            # Kanban Board
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;