import { MediaType, MessageType, TaskActivityType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AttachMediaToTaskInput } from "../../inputs/Task/AttachMedia";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AttachMediaToTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToTask(
		@Arg("data") { taskId, urls }: AttachMediaToTaskInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const task = await prisma.task.update({
			where: { id: taskId },
			data: {
				media: {
					create: urls.map((url) => ({
						url,
						uploadedBy: { connect: { id: user?.id } },
						type: MediaType.IMAGE
					}))
				},
				activity: {
					create: {
						description:
							`${user?.name} attached ${urls.length} ` +
							"media files to this task.",
						by: { connect: { id: user?.id } },
						type: TaskActivityType.ATTACH_MEDIA
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
