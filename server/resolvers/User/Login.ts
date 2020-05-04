import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { LoginInput } from "../../inputs/User/Login";
import { User } from "../../models/User";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class LoginResolver {
	@Mutation(() => User, { nullable: true })
	async login(
		@Arg("data") { email, password }: LoginInput,
		@Ctx() { req }: GraphQLContext
	) {
		const user = await prisma.user.findOne({ where: { email } });
		if (!user) return null;

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;

		req.session!.userId = user.id;
		return user;
	}
}
