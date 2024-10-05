import { z } from "zod";

// Zod schema for task creation and update
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Completed"]).optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  dueDate: z.string().optional(), // Assuming dueDate is a string, adjust as needed
});

export default taskSchema;
