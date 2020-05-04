import bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ForgotPasswordInput } from "../../inputs/User/ForgotPassword";
import { prisma } from "../../prisma";

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("data") { email, passwordOTP, newPassword }: ForgotPasswordInput
	) {
		const user = await prisma.user.findOne({ where: { email } });
		if (user && user.passwordOTP === passwordOTP) {
			const password = await bcrypt.hash(newPassword, 13);
			await prisma.user.update({ where: { email }, data: { password } });
			return true;
		} else return false;
	}
}
