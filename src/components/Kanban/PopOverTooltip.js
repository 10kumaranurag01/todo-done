import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import questionIcon from "../../assets/question-mark-svgrepo-com.svg"
import Image from "next/image"

const PopOverTooltip = () => {
    return (
        <Popover>
            <PopoverTrigger asChild >
                <Image src={questionIcon} alt="question-mark" height={12} width={12} />
            </PopoverTrigger>
            <PopoverContent className="dark">Drag tasks between sections to change their status.</PopoverContent>
        </Popover>

    )
}

export default PopOverTooltip
