import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AssignFinManagerInput } from "../../inputs/Department/AssignFinManager";
import { GraphQLContext } from "../../utils";

@Resolver()
export class AssignFinManagerResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { userId, deptId }: AssignFinManagerInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const dept = await prisma.department.update({
			where: { id: deptId },
			data: { finManager: { connect: { id: userId } } }
		});

		return !!dept;
	}
}
