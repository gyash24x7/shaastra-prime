import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../models/Task";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;
		const user = await prisma.user.findOne({ where: { id } });

		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await prisma.task.findMany({
					orderBy: { createdAt: "desc" }
				});
				return allTasks;

			case "CORE":
				const coreTasks = await prisma.department
					.findOne({ where: { id: user.deptId } })
					.tasksAssigned({ orderBy: { createdAt: "desc" } });
				return coreTasks;

			default:
				const coordTasks = await prisma.user
					.findOne({ where: { id } })
					.tasksAssigned({ orderBy: { createdAt: "desc" } });
				return coordTasks;
		}
	}
}
