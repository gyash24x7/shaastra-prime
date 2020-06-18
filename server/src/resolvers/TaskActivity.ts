import { FieldResolver, Resolver, Root } from "type-graphql";
import { Task } from "../entities/Task";
import { TaskActivity } from "../entities/TaskActivity";
import { User } from "../entities/User";

@Resolver(TaskActivity)
export class TaskActivityResolver {
	@FieldResolver()
	async createdBy(@Root() { createdById, createdBy }: TaskActivity) {
		if (createdBy) return createdBy;
		return User.findOne(createdById);
	}

	@FieldResolver()
	async task(@Root() { task, taskId }: TaskActivity) {
		if (task) return task;
		return Task.findOne(taskId);
	}
}
