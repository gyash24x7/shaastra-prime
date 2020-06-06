import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ForgotPasswordInput } from "../../inputs/User/ForgotPassword";
import { GraphQLContext } from "../../utils";

@Resolver()
export class ForgotPasswordResolver {
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("data") { email, newPassword }: ForgotPasswordInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const password = await bcrypt.hash(newPassword, 13);
		const user = await prisma.user.update({
			where: { email },
			data: { password }
		});
		return !!user;
	}
}
