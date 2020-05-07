import { TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AcceptTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async acceptTask(
		@Arg("taskId") taskId: string,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.findOne({ where: { id } });

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				status: TaskStatus.IN_PROGRESS,
				activity: {
					create: {
						type: TaskActivityType.IN_PROGRESS,
						by: { connect: { id } },
						description: `${user?.name} started working on the task.`
					}
				}
			}
		});

		return !!task;
	}
}
