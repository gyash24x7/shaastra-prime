import cuid from "cuid";
import graphqlFields from "graphql-fields";
import moment from "moment";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	PubSub,
	PubSubEngine,
	Query,
	Resolver
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { Media } from "../entities/Media";
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
	TaskActivityType,
	TaskStatus
} from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class TaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async acceptTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.IN_PROGRESS;
		task = await task.save();

		await TaskActivity.create({
			type: TaskActivityType.IN_PROGRESS,
			createdById: user.id,
			description: `${user!.name} started working on the task.`,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async assignTask(
		@Arg("data") { taskId, assignedTo }: AssignTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		task.assignedTo = await User.findByIds(assignedTo);
		task.status = TaskStatus.ASSIGNED;
		task = await task.save();

		await TaskActivity.create({
			type: TaskActivityType.ASSIGNED,
			createdById: user.id,
			description:
				`${user?.name}` +
				" assigned the task to " +
				`${task.assignedTo?.map((user) => user.name + ", ")}`,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToTask(
		@Arg("data") { taskId, urls }: AttachMediaToTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		await Promise.all(
			urls.map((url) =>
				Media.create({
					url,
					uploadedById: user.id,
					type: MediaType.IMAGE,
					id: cuid(),
					taskId
				}).save()
			)
		);

		await TaskActivity.create({
			description: `${user?.name} attached ${urls.length} media files to this task.`,
			type: TaskActivityType.ATTACH_MEDIA,
			createdById: user.id,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.COMPLETED;
		task = await task.save();

		await TaskActivity.create({
			type: TaskActivityType.COMPLETED,
			createdById: user.id,
			description: `${user!.name} marked the task as completed.`,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToTask(
		@Arg("data") { channelIds, taskId }: ConnectChannelsToTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		const newChannels = await Channel.findByIds(channelIds);

		task.channels.push(...newChannels);
		task = await task.save();

		await TaskActivity.create({
			description:
				`${user?.name} ` +
				"connected the following channels to this task: " +
				`${newChannels?.map(({ name }) => name + ", ")}`,
			type: TaskActivityType.CONNECT_CHANNEL,
			createdById: user.id,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data") { deadline, channelIds, ...rest }: CreateTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		const channels = await Channel.findByIds(channelIds);

		const task = await Task.create({
			...rest,
			deadline: moment(deadline, "DD/MM/YYYY").toISOString(),
			createdById: user.id,
			byDeptId: user.departmentId,
			channels
		}).save();

		await TaskActivity.create({
			description: `${user?.name} created the task.`,
			type: TaskActivityType.CREATED,
			createdById: user.id,
			taskId: task.id
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		task.deleted = true;
		task = await task.save();

		await TaskActivity.create({
			createdById: user.id,
			description: `${user?.name} deleted the task.`,
			type: TaskActivityType.DELETED,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}

	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { user }: GraphQLContext, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Task
		);

		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await Task.find({
					order: { createdOn: "DESC" },
					where: { deleted: false },
					select,
					relations
				});
				return allTasks;

			case "CORE":
				return Task.find({
					order: { createdOn: "DESC" },
					where: { deleted: false, forDeptId: user.departmentId },
					select,
					relations
				});

			default:
				const { tasksAssigned } = await User.findOneOrFail(user.id, {
					relations: ["tasksAssigned"]
				});
				return tasksAssigned.reverse().filter((task) => task.deleted === false);
		}
	}

	@Authorized()
	@Query(() => Task)
	async getTask(@Arg("taskId") taskId: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Task
		);

		const task = await Task.findOne(taskId, { select, relations });
		return task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async submitTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.SUBMITTED;
		task = await task.save();

		await TaskActivity.create({
			type: TaskActivityType.SUBMITTED,
			createdById: user.id,
			description: `${user!.name} submitted the task.`,
			taskId
		}).save({ data: { channels: task.channels, pubsub } });

		return !!task;
	}
}
