import { MediaType, MessageType, TaskActivityType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AttachMediaToTaskInput } from "../../inputs/Task/AttachMedia";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AttachMediaToTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToTask(
		@Arg("data") { taskId, urls }: AttachMediaToTaskInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.findOne({ where: { id } });

		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				media: {
					create: urls.map((url) => ({
						url,
						uploadedBy: { connect: { id } },
						type: MediaType.IMAGE
					}))
				},
				activity: {
					create: {
						description: `${user?.name} attached ${urls.length} media files to this task.`,
						by: { connect: { id } },
						type: TaskActivityType.ATTACH_MEDIA
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
							<p>${user?.name} attached ${urls.length} media files to this task.</p>`,
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
