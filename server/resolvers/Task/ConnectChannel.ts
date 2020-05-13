import { MessageType, TaskActivityType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";
import { ConnectChannelsInput } from "./../../inputs/Task/ConnectChannels";

@Resolver()
export class ConnectChannelsResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async connectChannels(
		@Arg("data") { channelIds, taskId }: ConnectChannelsInput,
		@Ctx() { user }: GraphQLContext
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
						description: `
              ${user?.name} connected the following channels to this task:
              ${channels?.map(({ name }) => name + ", ")}
            `,
						type: TaskActivityType.CONNECT_CHANNEL,
						by: { connect: { id: user?.id } }
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
              <p>
                ${user?.name} connected the following channels to this task:
                ${channels?.map(({ name }) => name + ", ")}
              </p>`,
						type: MessageType.TASK_UPDATE,
						createdBy: { connect: { id: user?.id } }
					}
				})
			)
		).then(() => {
			console.log("Task Update Messages Sent!");
		});

		return !!task;
	}
}
