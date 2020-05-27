import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class DeleteVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async deleteVertical(
		@Arg("id") id: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const vertical = await prisma.vertical.delete({ where: { id } });
		return !!vertical;
	}
}
