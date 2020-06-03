import { MessageType, TaskActivityType, TaskStatus } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AssignTaskInput } from "../../inputs/Task/AssignTask";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AssignTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async assignTask(
		@Arg("data") { taskId, assignedTo }: AssignTaskInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const assignedUsers = await prisma.user.findMany({
			where: { id: { in: assignedTo } }
		});

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				assignedTo: { connect: assignedTo.map((id) => ({ id })) },
				status: TaskStatus.ASSIGNED,
				activity: {
					create: {
						type: TaskActivityType.ASSIGNED,
						by: { connect: { id: user?.id } },
						description:
							`${user?.name}` +
							"assigned the task to " +
							`${assignedUsers?.map((user) => user.name + ", ")}`
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
