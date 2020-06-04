import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class DeleteMemberResolver {
	@Authorized("CORE")
	@Mutation(() => Boolean)
	async deleteMember(
		@Arg("userId") userId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const user = await prisma.user.delete({ where: { id: userId } });
		return !!user;
	}
}
