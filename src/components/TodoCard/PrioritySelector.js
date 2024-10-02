import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const PrioritySelector = ({ priority, setPriority }) => {
    return (
        <Select onValueChange={setPriority} value={priority}>
            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Select your priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Low">📗 Low</SelectItem>
                <SelectItem value="Medium">📙 Medium</SelectItem>
                <SelectItem value="High">📕 High</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default PrioritySelector
