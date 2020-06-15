import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateTaskInput } from "../../inputs/Task/CreateTask";
import { Channel } from "../../models/Channel";
import { Department } from "../../models/Department";
import { Message } from "../../models/Message";
import { Task } from "../../models/Task";
import { TaskActivity } from "../../models/TaskActivity";
import { GraphQLContext, MessageType, TaskActivityType } from "../../utils";

@Resolver()
export class CreateTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data")
		{ brief, deadline, details, forDeptId, channelIds }: CreateTaskInput,
		@Ctx() { user }: GraphQLContext
	) {
		const task = await Task.create({
			brief,
			deadline: moment(deadline, "DD/MM/YYYY").toISOString(),
			details,
			forDept: Department.findOne(forDeptId),
			createdBy: Promise.resolve(user),
			byDept: user.department,
			channels: Channel.findByIds(channelIds)
		}).save();

		const activity = await TaskActivity.create({
			description: `${user?.name} created the task.`,
			type: TaskActivityType.CREATED,
			createdBy: Promise.resolve(user),
			task: Promise.resolve(task)
		}).save();

		const channels = await task.channels;

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
