import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GrantAccessInput } from "../../inputs/Department/GrantAccess";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GrantAccessResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async grantAccess(
		@Arg("data") { userId, role }: GrantAccessInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const user = await prisma.user.update({
			where: { id: userId },
			data: { role }
		});

		return !!user;
	}
}
