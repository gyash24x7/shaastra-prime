import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class DeleteVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async deleteVertical(@Arg("id") id: string) {
		const vertical = await prisma.vertical.delete({ where: { id } });
		return !!vertical;
	}
}
