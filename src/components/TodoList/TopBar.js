import { useState } from "react";
import AddEditTodoDialog from "../AddEditTodoDialog";
import PrioritySelector from "../TodoCard/PrioritySelector";
import StatusSelector from "../TodoCard/StatusSelector";
import DatePicker from "../TodoCard/DatePicker";
import { Button } from "@/components/ui/button";
import resetIcon from "../../assets/reset-svgrepo-com.svg";
import Image from "next/image";
import { Filter } from "lucide-react";

const TopBar = ({
  priority,
  setPriority,
  status,
  setStatus,
  dueDate,
  setDueDate,
  handleResetFilters,
}) => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-2 md:gap-4 lg:gap-6">
      <div className="flex justify-start items-center mb-4 md:mb-0 lg:mb-0 cursor-pointer" title="Filter">
        <Filter alt="filter"height={24} />
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:gap-3 lg:gap-4">
        <div className="flex-1">
          <DatePicker setDueDate={setDueDate} dueDate={dueDate} />
        </div>
        <div className="flex-1">
          <StatusSelector setStatus={setStatus} status={status} />
        </div>
        <div className="flex-1">
          <PrioritySelector setPriority={setPriority} priority={priority} />
        </div>
        <div className="flex-1">
          <Button
            variant="destructive"
            size="icon"
            title="Reset Filters"
            onClick={handleResetFilters}
          >
            <Image src={resetIcon} alt="reset" height={16} width={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
