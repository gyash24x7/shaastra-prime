import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class DeleteTaskResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteTask(@Arg("taskId") taskId: string) {
		const task = await prisma.task.delete({ where: { id: taskId } });
		return !!task;
	}
}
