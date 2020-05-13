import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UploadCoverPicResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async uploadCoverPic(
		@Arg("coverPic") coverPic: string,
		@Ctx() { user }: GraphQLContext
	) {
		const updatedUser = await prisma.user.update({
			where: { id: user?.id },
			data: { coverPic }
		});
		return !!updatedUser;
	}
}
