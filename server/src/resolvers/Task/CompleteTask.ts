import { MessageType, TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CompleteTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async completeTask(
		@Arg("taskId") taskId: string,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				status: TaskStatus.COMPLETED,
				activity: {
					create: {
						type: TaskActivityType.COMPLETED,
						by: { connect: { id: user?.id } },
						description: `${user?.name} marked the task as completed.`
					}
				}
			},
			include: {
				channels: { select: { id: true } },
				activity: { select: { id: true } }
			}
		});

		Promise.all(
			task.channels.map((channel) =>
				prisma.message.create({
					data: {
						channel: { connect: { id: channel.id } },
						content: "",
						type: MessageType.TASK_ACTIVITY,
						createdBy: { connect: { id: user?.id } },
						taskActivity: {
							connect: { id: task.activity.reverse().shift()?.id }
						}
					}
				})
			)
		).then(() => {
			console.log("Task Activity Messages Sent!");
		});

		return !!task;
	}
}
