import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import {
	GraphQLContext,
	MessageType,
	TaskActivityType,
	TaskStatus
} from "../../utils";

@Resolver()
export class CompleteTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Task.update(taskId, {
			status: TaskStatus.COMPLETED
		});

		const task = await Task.findOne(taskId);

		if (!affected || !task) return false;

		const channels = await task.channels;

		const activity = await TaskActivity.create({
			type: TaskActivityType.COMPLETED,
			createdBy: Promise.resolve(user),
			description: `${user!.name} marked the task as completed.`,
			task: Promise.resolve(task)
		}).save();

		Promise.all(
			channels.map((channel) =>
				Message.create({
					channel: Promise.resolve(channel),
					content: "",
					type: MessageType.TASK_ACTIVITY,
					createdBy: Promise.resolve(user),
					taskActivity: Promise.resolve(activity)
				}).save()
			)
		).then(() => {
			console.log("Task Activity Messages Sent!");
		});

		return !!task;
	}
}
