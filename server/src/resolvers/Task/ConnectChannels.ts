import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ConnectChannelsToTaskInput } from "../../inputs/Task";
import { Channel } from "../../models/Channel";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import { GraphQLContext, MessageType, TaskActivityType } from "../../utils";

@Resolver()
export class ConnectChannelsToTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToTask(
		@Arg("data") { channelIds, taskId }: ConnectChannelsToTaskInput,
		@Ctx() { user }: GraphQLContext
	) {
		const newChannels = await Channel.findByIds(channelIds);
		let task = await Task.findOne(taskId);
		let channels = await task?.channels;

		if (!task || !channels) return false;

		const { affected } = await Task.update(taskId, {
			channels: Promise.resolve([...channels, ...newChannels])
		});

		const activity = await TaskActivity.create({
			description:
				`${user?.name} ` +
				"connected the following channels to this task: " +
				`${channels?.map(({ name }) => name + ", ")}`,
			type: TaskActivityType.CONNECT_CHANNEL,
			createdBy: Promise.resolve(user),
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

		return !!affected;
	}
}
