import { MessageType, TaskActivityType } from "@prisma/client";
import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateTaskInput } from "../../inputs/Task/CreateTask";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data")
		{ brief, deadline, details, forDeptId, channelIds }: CreateTaskInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const task = await prisma.task.create({
			data: {
				brief,
				deadline: moment(deadline, "DD/MM/YYYY").toDate(),
				details,
				forDept: { connect: { id: forDeptId } },
				createdBy: { connect: { id: user?.id } },
				byDept: { connect: { id: user?.deptId } },
				activity: {
					create: {
						type: TaskActivityType.CREATED,
						by: { connect: { id: user?.id } },
						description: `${user?.name} created the task.`
					}
				},
				channels: { connect: channelIds.map((id) => ({ id })) }
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
							<p>${user?.name} created the task.</p>
						`,
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