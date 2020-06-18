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
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		task.status = TaskStatus.IN_PROGRESS;
		await task.save({
			data: { user, type: TaskActivityType.IN_PROGRESS, pubsub }
		});
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async assignTask(
		@Arg("data") { taskId, assignedTo }: AssignTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		task.assignedTo = await User.findByIds(assignedTo);
		task.status = TaskStatus.ASSIGNED;
		await task.save({
			data: { user, pubsub, type: TaskActivityType.ASSIGNED }
		});
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToTask(
		@Arg("data") { taskId, urls }: AttachMediaToTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		await Promise.all(
			urls.map((url) => {
				let media = new Media();
				media.url = url;
				media.uploadedById = user.id;
				media.type = MediaType.IMAGE;
				media.taskId = taskId;
				return media.save();
			})
		);

		await task.save({
			data: { user, pubsub, type: TaskActivityType.ATTACH_MEDIA }
		});
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		task.status = TaskStatus.COMPLETED;
		await task.save({
			data: { user, pubsub, type: TaskActivityType.COMPLETED }
		});
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToTask(
		@Arg("data") { channelIds, taskId }: ConnectChannelsToTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		const newChannels = await Channel.findByIds(channelIds);
		task.channels.push(...newChannels);
		await task.save({
			data: { user, pubsub, type: TaskActivityType.CONNECT_CHANNEL }
		});
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data") { deadline, channelIds, ...rest }: CreateTaskInput,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = new Task();
		task.brief = rest.brief;
		task.deadline = moment(deadline, "DD/MM/YYYY").toISOString();
		task.details = rest.details;
		task.forDeptId = rest.forDeptId;
		task.byDeptId = user.departmentId;
		task.channels = await Channel.findByIds(channelIds);
		task.createdById = user.id;

		await task.save({ data: { user, pubsub, type: TaskActivityType.CREATED } });
		return !!task;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user }: GraphQLContext,
		@PubSub() pubsub: PubSubEngine
	) {
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		task.deleted = true;
		task = await task.save({
			data: { user, pubsub, type: TaskActivityType.DELETED }
		});
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
		let task = await Task.findOneOrFail(taskId, { relations: ["channels"] });
		task.status = TaskStatus.SUBMITTED;
		task = await task.save({
			data: { user, pubsub, type: TaskActivityType.SUBMITTED }
		});

		return !!task;
	}
}
