import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class VerifyUserResolver {
	@Authorized()
	@Mutation(() => String, { nullable: true })
	async verifyUser(
		@Arg("otp") otp: string,
		@Ctx() { prisma, user }: GraphQLContext
	) {
		if (user?.verificationOTP !== otp) return null;

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { verified: true }
		});

		return updatedUser ? user.id : null;
	}
}
