import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UploadProfilePicResolver {
	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { user }: GraphQLContext
	) {
		const updatedUser = await User.update(user.id, { profilePic });
		return !!updatedUser;
	}
}
