import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { VerifyUserInput } from "../../inputs/User/VerifyUser";
import { GraphQLContext } from "../../utils";

@Resolver()
export class VerifyUserResolver {
	@Mutation(() => Boolean)
	async verifyUser(
		@Arg("data") { email, otp }: VerifyUserInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		let user = await prisma.user.findOne({ where: { email } });

		if (!user) return false;
		else {
			if (user.verificationOTP !== otp) return false;
			await prisma.user.update({
				where: { email },
				data: { verified: true }
			});
			return true;
		}
	}
}