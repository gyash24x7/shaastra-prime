import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UploadCoverPicResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async uploadCoverPic(
		@Arg("coverPic") coverPic: string,
		@Ctx() { user }: GraphQLContext
	) {
		const updatedUser = await User.update(user.id, { coverPic });
		return !!updatedUser;
	}
}
