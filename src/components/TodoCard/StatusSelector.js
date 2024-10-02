import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const StatusSelector = ({ status, setStatus }) => {
    return (
        <Select onValueChange={setStatus} value={status}>
            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="To Do">📋 To Do</SelectItem>
                <SelectItem value="In Progress">🕓 In Progress</SelectItem>
                <SelectItem value="Completed">✅ Completed</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default StatusSelector
