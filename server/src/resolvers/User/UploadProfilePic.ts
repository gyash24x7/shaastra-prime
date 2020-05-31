import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UploadProfilePicResolver {
	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const updatedUser = await prisma.user.update({
			where: { id: user?.id },
			data: { profilePic }
		});
		return !!updatedUser;
	}
}