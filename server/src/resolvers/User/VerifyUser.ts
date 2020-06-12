import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class VerifyUserResolver {
	@Authorized()
	@Mutation(() => String, { nullable: true })
	async verifyUser(@Arg("otp") otp: string, @Ctx() { user }: GraphQLContext) {
		if (user?.verificationOTP !== otp) return null;

		const updatedUser = await User.update(user.id, { verified: true });

		return updatedUser ? user.id : null;
	}
}
