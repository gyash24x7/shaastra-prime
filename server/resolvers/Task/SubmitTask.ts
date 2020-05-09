import { MessageType, TaskActivityType, TaskStatus } from "@prisma/client";
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
		const id = req.session!.userId;
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
							<p>${user?.name} submitted the task.</p>`,
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
