import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AssignTaskInput } from "../../inputs/Task/AssignTask";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import { User } from "../../models/User";
import {
	GraphQLContext,
	MessageType,
	TaskActivityType,
	TaskStatus
} from "../../utils";

@Resolver()
export class AssignTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async assignTask(
		@Arg("data") { taskId, assignedTo }: AssignTaskInput,
		@Ctx() { user }: GraphQLContext
	) {
		const assignedUsers = await User.findByIds(assignedTo);
		const task = await Task.findOne(taskId);

		const { affected } = await Task.update(taskId, {
			assignedTo: Promise.resolve(assignedUsers),
			status: TaskStatus.ASSIGNED
		});

		if (!task || !affected) return false;

		const channels = await task.channels;

		const activity = await TaskActivity.create({
			type: TaskActivityType.ASSIGNED,
			createdBy: Promise.resolve(user),
			description:
				`${user?.name}` +
				"assigned the task to " +
				`${assignedUsers?.map((user) => user.name + ", ")}`,
			task: Promise.resolve(task)
		});

		Promise.all(
			channels.map((channel) =>
				Message.create({
					content: "",
					type: MessageType.TASK_ACTIVITY,
					createdBy: Promise.resolve(user),
					taskActivity: Promise.resolve(activity),
					channel: Promise.resolve(channel)
				}).save()
			)
		).then(() => {
			console.log("Task Activity Messages Sent!");
		});

		return !!task;
	}
}
