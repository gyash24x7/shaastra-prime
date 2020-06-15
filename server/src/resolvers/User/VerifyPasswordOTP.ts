import { Arg, Mutation, Resolver } from "type-graphql";
import { VerifyPasswordOTPInput } from "../../inputs/User";
import { User } from "../../models/User";

@Resolver()
export class VerifyPasswordOTPResolver {
	@Mutation(() => Boolean)
	async verifyPasswordOTP(
		@Arg("data") { email, passwordOTP }: VerifyPasswordOTPInput
	) {
		const user = await User.findOne({ where: { email } });
		return !!(user?.passwordOTP === passwordOTP);
	}
}
