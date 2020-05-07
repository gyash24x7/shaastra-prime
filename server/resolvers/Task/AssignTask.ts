import { TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AssignTaskInput } from "../../inputs/Task/AssignTask";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AssignTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async assignTask(
		@Arg("data") { taskId, assignedTo }: AssignTaskInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.id;
		const [user, assignedUser] = await Promise.all([
			prisma.user.findOne({ where: { id } }),
			prisma.user.findMany({ where: { id: { in: assignedTo } } })
		]);

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				assignedTo: { connect: assignedTo.map((id) => ({ id })) },
				status: TaskStatus.ASSIGNED,
				activity: {
					create: {
						type: TaskActivityType.ASSIGNED,
						by: { connect: { id } },
						description: `${
							user?.name
						} assigned the task to ${assignedUser?.map(
							(user) => user.name + ", "
						)}`
					}
				}
			}
		});

		return !!task;
	}
}
