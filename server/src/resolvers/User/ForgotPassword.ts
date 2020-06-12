import bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ForgotPasswordInput } from "../../inputs/User/ForgotPassword";
import { User } from "../../models/User";

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("data") { email, newPassword }: ForgotPasswordInput
	) {
		const password = await bcrypt.hash(newPassword, 13);
		let user = await User.findOne({ where: { email } });
		if (!user) return false;

		user.password = password;
		user = await user.save();
		return !!user;
	}
}
