import { MessageType, TaskActivityType, TaskStatus } from "@prisma/client";
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
		const id = req.session!.userId;
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
			},
			include: { channels: { select: { id: true } } }
		});

		Promise.all(
			task.channels.map((channel) =>
				prisma.message.create({
					data: {
						channel: { connect: { id: channel.id } },
						content: `
							<p><strong>[TASK UPDATE: ${task.brief}]</strong></p>
							<p>${user?.name} marked the task as completed..</p>`,
						type: MessageType.TASK_UPDATE,
						createdBy: { connect: { id } }
					}
				})
			)
		).then(() => {
			console.log("Task Update Messages Sent!");
		});

		return !!task;
	}
}
