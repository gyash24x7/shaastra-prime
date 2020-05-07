import { TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class SubmitTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async submitTask(
		@Arg("taskId") taskId: string,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.id;
		const user = await prisma.user.findOne({ where: { id } });

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				status: TaskStatus.SUBMITTED,
				activity: {
					create: {
						type: TaskActivityType.SUBMITTED,
						by: { connect: { id } },
						description: `${user?.name} submitted the task.`
					}
				}
			}
		});

		return !!task;
	}
}
