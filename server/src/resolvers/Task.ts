import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Channel } from "../entities/Channel";
import { Department } from "../entities/Department";
import { Media } from "../entities/Media";
import { Message } from "../entities/Message";
import { Task } from "../entities/Task";
import { TaskActivity } from "../entities/TaskActivity";
import { User } from "../entities/User";
import {
	AssignTaskInput,
	AttachMediaToTaskInput,
	ConnectChannelsToTaskInput,
	CreateTaskInput
} from "../inputs/Task";
import {
	GraphQLContext,
	MediaType,
	MessageType,
	TaskActivityType,
	TaskStatus
} from "../utils";

@Resolver()
export class TaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async acceptTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Task.update(taskId, {
			status: TaskStatus.IN_PROGRESS
		});

		const task = await Task.findOne(taskId);

		if (!affected || !task) return false;

		const channels = await task.channels;

		const activity = await TaskActivity.create({
			type: TaskActivityType.IN_PROGRESS,
			createdBy: Promise.resolve(user),
			description: `${user!.name} started working on the task.`,
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
		}).save();

		Message.create({
			content: "",
			type: MessageType.TASK_ACTIVITY,
			createdBy: Promise.resolve(user),
			taskActivity: Promise.resolve(activity),
			channels: Promise.resolve(channels)
		})
			.save()
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}

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

	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { user }: GraphQLContext) {
		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await Task.find({
					order: { createdOn: "DESC" },
					where: { deleted: false }
				});
				return allTasks;

			case "CORE":
				const userDept = await user.department;
				const coreTasks = await userDept.tasksAssigned;
				return coreTasks.reverse().filter((task) => task.deleted === false);

			default:
				const coordTasks = await user.tasksAssigned;
				return coordTasks.reverse().filter((task) => task.deleted === false);
		}
	}

	@Authorized()
	@Query(() => Task)
	async getTask(@Arg("taskId") taskId: string) {
		const task = await Task.findOne(taskId);
		return task;
	}

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
