import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginInput } from "../../inputs/User/Login";
import { prisma } from "../../prisma";
dotenv.config();

@Resolver()
export class LoginResolver {
	@Mutation(() => String, { nullable: true })
	async login(@Arg("data") { email, password }: LoginInput) {
		const user = await prisma.user.findOne({ where: { email } });
		if (!user) return null;

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;

		return jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
	}
}
