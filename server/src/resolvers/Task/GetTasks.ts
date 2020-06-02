import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../models/Task";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { user, prisma }: GraphQLContext) {
		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await prisma.task.findMany({
					orderBy: { createdAt: "desc" },
					where: { deleted: false }
				});
				return allTasks;

			case "CORE":
				const coreTasks = await prisma.department
					.findOne({ where: { id: user.deptId } })
					.tasksAssigned({
						orderBy: { createdAt: "desc" },
						where: { deleted: false }
					});
				return coreTasks;

			default:
				const coordTasks = await prisma.user
					.findOne({ where: { id: user?.id } })
					.tasksAssigned({
						orderBy: { createdAt: "desc" },
						where: { deleted: false }
					});
				return coordTasks;
		}
	}

	@Authorized()
	@Query(() => Task)
	async getTask(
		@Arg("taskId") taskId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.task.findOne({ where: { id: taskId } });
	}
}
