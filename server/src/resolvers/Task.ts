import graphqlFields from "graphql-fields";
import moment from "moment";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Task } from "../entities/Task";
import {
	AssignTaskInput,
	AttachMediaToTaskInput,
	ConnectChannelsToTaskInput,
	CreateTaskInput
} from "../inputs/Task";
import { ChannelRepository } from "../repositories/Channel";
import { MediaRepository } from "../repositories/Media";
import { MessageRepository } from "../repositories/Message";
import { TaskRepository } from "../repositories/Task";
import { TaskActivityRepository } from "../repositories/TaskActivity";
import { UserRepository } from "../repositories/User";
import {
	GraphQLContext,
	MediaType,
	MessageType,
	TaskActivityType,
	TaskStatus
} from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class TaskResolver {
	@InjectRepository()
	private readonly taskRepo: TaskRepository;

	@InjectRepository()
	private readonly taskActivityRepo: TaskActivityRepository;

	@InjectRepository()
	private readonly channelRepo: ChannelRepository;

	@InjectRepository()
	private readonly mediaRepo: MediaRepository;

	@InjectRepository()
	private readonly msgRepo: MessageRepository;

	@InjectRepository()
	private readonly userRepo: UserRepository;

	@Authorized()
	@Mutation(() => Boolean)
	async acceptTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.IN_PROGRESS;
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			type: TaskActivityType.IN_PROGRESS,
			createdById: user.id,
			description: `${user!.name} started working on the task.`,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
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
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		const assignedUsers = await this.userRepo.findByIds(assignedTo);

		task.assignedTo.push(...assignedUsers);
		task.status = TaskStatus.ASSIGNED;
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			type: TaskActivityType.ASSIGNED,
			createdById: user.id,
			description:
				`${user?.name}` +
				"assigned the task to " +
				`${assignedUsers?.map((user) => user.name + ", ")}`,
			taskId
		});

		this.msgRepo
			.save({
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity,
				channels: task.channels
			})
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
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channel"]
		});

		const media = this.mediaRepo.create(
			urls.map((url) => ({
				url,
				createdById: user.id,
				type: MediaType.IMAGE
			}))
		);

		task.media.push(...media);
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			description: `${user?.name} attached ${urls.length} media files to this task.`,
			type: TaskActivityType.ATTACH_MEDIA,
			createdById: user.id,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.COMPLETED;
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			type: TaskActivityType.COMPLETED,
			createdById: user.id,
			description: `${user!.name} marked the task as completed.`,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
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
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		const newChannels = await this.channelRepo.findByIds(channelIds);

		task.channels.push(...newChannels);
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			description:
				`${user?.name} ` +
				"connected the following channels to this task: " +
				`${newChannels?.map(({ name }) => name + ", ")}`,
			type: TaskActivityType.CONNECT_CHANNEL,
			createdById: user.id,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data")
		{ brief, deadline, details, forDeptId, channelIds }: CreateTaskInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channels = await this.channelRepo.findByIds(channelIds);

		const task = await this.taskRepo.save({
			brief,
			deadline: moment(deadline, "DD/MM/YYYY").toISOString(),
			details,
			forDeptId,
			createdById: user.id,
			byDeptId: user.departmentId,
			channels
		});

		const activity = this.taskActivityRepo.create({
			description: `${user?.name} created the task.`,
			type: TaskActivityType.CREATED,
			createdById: user.id,
			taskId: task.id
		});

		this.msgRepo
			.save({
				channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
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
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});
		task.deleted = true;
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			createdById: user.id,
			description: `${user?.name} deleted the task.`,
			type: TaskActivityType.DELETED,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}

	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { user }: GraphQLContext, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.taskRepo
		);

		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await this.taskRepo.find({
					order: { createdOn: "DESC" },
					where: { deleted: false },
					select,
					relations
				});
				return allTasks;

			case "CORE":
				return this.taskRepo.find({
					order: { createdOn: "DESC" },
					where: { deleted: false, forDeptId: user.departmentId },
					select,
					relations
				});

			default:
				const { tasksAssigned } = await this.userRepo.findOneOrFail(user.id, {
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
			this.taskRepo
		);

		const task = await this.taskRepo.findOne(taskId, { select, relations });
		return task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async submitTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext
	) {
		let task = await this.taskRepo.findOneOrFail(taskId, {
			relations: ["channels"]
		});

		task.status = TaskStatus.SUBMITTED;
		task = await this.taskRepo.save(task);

		const activity = this.taskActivityRepo.create({
			type: TaskActivityType.SUBMITTED,
			createdById: user.id,
			description: `${user!.name} submitted the task.`,
			taskId
		});

		this.msgRepo
			.save({
				channels: task.channels,
				content: "",
				type: MessageType.TASK_ACTIVITY,
				createdById: user.id,
				taskActivity: activity
			})
			.then(() => {
				console.log("Task Activity Messages Sent!");
			});

		return !!task;
	}
}
