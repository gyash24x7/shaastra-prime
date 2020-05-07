import { TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CompleteTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.id;
		const user = await prisma.user.findOne({ where: { id } });

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				status: TaskStatus.COMPLETED,
				activity: {
					create: {
						type: TaskActivityType.COMPLETED,
						by: { connect: { id } },
						description: `${user?.name} marked the task as completed.`
					}
				}
			}
		});

		return !!task;
	}
}
