import { MessageType, TaskActivityType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ConnectChannelsToTaskInput } from "../../inputs/Task/ConnectChannels";
import { GraphQLContext } from "../../utils";

@Resolver()
export class ConnectChannelsToTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToTask(
		@Arg("data") { channelIds, taskId }: ConnectChannelsToTaskInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const channels = await prisma.channel.findMany({
			where: { id: { in: channelIds } }
		});

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				channels: { connect: channelIds.map((id) => ({ id })) },
				activity: {
					create: {
						description:
							`${user?.name} ` +
							"connected the following channels to this task: " +
							`${channels?.map(({ name }) => name + ", ")}`,
						type: TaskActivityType.CONNECT_CHANNEL,
						by: { connect: { id: user?.id } }
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
