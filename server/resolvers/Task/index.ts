import { AcceptTaskResolver } from "./AcceptTask";
import { AssignTaskResolver } from "./AssignTask";
import { CompleteTaskResolver } from "./CompleteTask";
import { CreateTaskResolver } from "./CreateTask";
import { DeleteTaskResolver } from "./DeleteTask";
import { TaskFieldResolvers } from "./FieldResolvers";
import { SubmitTaskResolver } from "./SubmitTask";

export default [
	TaskFieldResolvers,
	CreateTaskResolver,
	AssignTaskResolver,
	AcceptTaskResolver,
	SubmitTaskResolver,
	CompleteTaskResolver,
	DeleteTaskResolver
];
