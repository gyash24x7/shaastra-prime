import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../models/Task";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetTasksResolver {
	@Authorized()
	@Query(() => [Task])
	async getTasks(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.id;
		const user = await prisma.user.findOne({ where: { id } });

		switch (user?.role) {
			case "COCAD":
			case "COCAS":
				const allTasks = await prisma.task.findMany();
				return allTasks;

			case "CORE":
				const coreTasks = await prisma.department
					.findOne({ where: { id: user.deptId } })
					.tasksAssigned();
				return coreTasks;

			default:
				const coordTasks = await prisma.user
					.findOne({ where: { id } })
					.tasksAssigned();
				return coordTasks;
		}
	}
}
