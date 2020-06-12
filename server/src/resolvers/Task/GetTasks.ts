import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../models/Task";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetTasksResolver {
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
}
