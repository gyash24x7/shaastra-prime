import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AttachMediaToTaskInput } from "../../inputs/Task/AttachMedia";
import { Media } from "../../models/Media";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import {
	GraphQLContext,
	MediaType,
	MessageType,
	TaskActivityType
} from "../../utils";

@Resolver()
export class AttachMediaToTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToTask(
		@Arg("data") { taskId, urls }: AttachMediaToTaskInput,
		@Ctx() { user }: GraphQLContext
	) {
		let task = await Task.findOne(taskId);
		let channels = await task?.channels;

		if (!task || !channels) return false;

		const media = Media.create(
			urls.map((url) => ({
				url,
				createdBy: Promise.resolve(user),
				type: MediaType.IMAGE
			}))
		);

		const { affected } = await Task.update(taskId, {
			media: Promise.all(media.map((obj) => obj.save()))
		});

		const activity = await TaskActivity.create({
			description: `${user?.name} attached ${urls.length} media files to this task.`,
			type: TaskActivityType.ATTACH_MEDIA,
			createdBy: Promise.resolve(user),
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

		return !!affected;
	}
}
