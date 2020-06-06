import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { VerifyPasswordOTPInput } from "../../inputs/User/VerifyPasswordOTP";
import { GraphQLContext } from "../../utils";

@Resolver()
export class VerifyPasswordOTPResolver {
	@Mutation(() => Boolean)
	async verifyPasswordOTP(
		@Arg("data") { email, passwordOTP }: VerifyPasswordOTPInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const user = await prisma.user.findOne({ where: { email } });
		return !!(user?.passwordOTP === passwordOTP);
	}
}
