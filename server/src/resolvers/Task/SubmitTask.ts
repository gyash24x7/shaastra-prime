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
export class SubmitTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async submitTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Task.update(taskId, {
			status: TaskStatus.SUBMITTED
		});

		const task = await Task.findOne(taskId);

		if (!affected || !task) return false;

		const channels = await task.channels;

		const activity = await TaskActivity.create({
			type: TaskActivityType.SUBMITTED,
			createdBy: Promise.resolve(user),
			description: `${user!.name} submitted the task.`,
			task: Promise.resolve(task)
		}).save();

		Message.create({
			channels: Promise.resolve(channels),
			content: "",
			type: MessageType.TASK_ACTIVITY,
			createdBy: Promise.resolve(user),
			taskActivity: Promise.resolve(activity)
		})
			.save()
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}
}
