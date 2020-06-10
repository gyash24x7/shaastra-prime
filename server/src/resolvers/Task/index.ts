import { AcceptTaskResolver } from "./AcceptTask";
import { AssignTaskResolver } from "./AssignTask";
import { AttachMediaToTaskResolver } from "./AttachMedia";
import { CompleteTaskResolver } from "./CompleteTask";
import { ConnectChannelsToTaskResolver } from "./ConnectChannels";
import { CreateTaskResolver } from "./CreateTask";
import { DeleteTaskResolver } from "./DeleteTask";
import { GetTasksResolver } from "./GetTasks";
import { SubmitTaskResolver } from "./SubmitTask";

export default [
	CreateTaskResolver,
	AssignTaskResolver,
	AcceptTaskResolver,
	SubmitTaskResolver,
	CompleteTaskResolver,
	DeleteTaskResolver,
	ConnectChannelsToTaskResolver,
	AttachMediaToTaskResolver,
	GetTasksResolver
];
