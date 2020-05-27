import { AcceptTaskResolver } from "./AcceptTask";
import { AssignTaskResolver } from "./AssignTask";
import { AttachMediaToTaskResolver } from "./AttachMedia";
import { CompleteTaskResolver } from "./CompleteTask";
import { ConnectChannelsToTaskResolver } from "./ConnectChannels";
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
	DeleteTaskResolver,
	ConnectChannelsToTaskResolver,
	AttachMediaToTaskResolver
];
