"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"


const DatePicker = ({ setDueDate, dueDate }) => {
    const [openDialog, setOpenDialog] = useState(false)    
    const handleOnSelect = (dateSelected) => {
        setDueDate(dateSelected)
        setOpenDialog(false)
    }
    return (
        <Popover open={openDialog} setOpenDialog={setOpenDialog}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[190px] justify-start text-left font-normal dark",
                        !dueDate && "text-muted-foreground"
                    )}
                    onClick={() => setOpenDialog(true)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark">
                <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={handleOnSelect}
                    initialFocus
                    className="dark"
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
