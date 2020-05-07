import { TaskActivityType } from "@prisma/client";
import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateTaskInput } from "../../inputs/Task/CreateTask";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createTask(
		@Arg("data") { brief, deadline, details, forDeptId }: CreateTaskInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.findOne({ where: { id } });

		const task = prisma.task.create({
			data: {
				brief,
				deadline: moment(deadline, "DD/MM/YYYY").toDate(),
				details,
				forDept: { connect: { id: forDeptId } },
				createdBy: { connect: { id } },
				byDept: { connect: { id: user?.deptId } },
				activity: {
					create: {
						type: TaskActivityType.CREATED,
						by: { connect: { id } },
						description: `${user?.name} created the task.`
					}
				}
			}
		});

		return !!task;
	}
}
