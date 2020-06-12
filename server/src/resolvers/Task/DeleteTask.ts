import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import { GraphQLContext, MessageType, TaskActivityType } from "../../utils";

@Resolver()
export class DeleteTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		let task = await Task.findOne(taskId);

		const { affected } = await Task.update(taskId, { deleted: true });

		if (!affected || !task) return false;

		const channels = await task.channels;

		const activity = await TaskActivity.create({
			createdBy: Promise.resolve(user),
			description: `${user?.name} deleted the task.`,
			type: TaskActivityType.DELETED,
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
