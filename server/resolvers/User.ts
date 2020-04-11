import bcrypt from "bcryptjs";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { CreateUserInput } from "../inputs/User/CreateUser";
import { ForgotPasswordInput } from "../inputs/User/ForgotPassword";
import { LoginInput } from "../inputs/User/Login";
import { VerifyUserInput } from "../inputs/User/VerifyUser";
import { Department } from "../models/Department";
import { User } from "../models/User";
import { prisma } from "../prisma";
import { GraphQLContext } from "../utils";

@Resolver(User)
export class UserResolver {
	@Mutation(() => Boolean)
	async createUser(
		@Arg("data") data: CreateUserInput,
		@Ctx() { req }: GraphQLContext
	) {
		const password = await bcrypt.hash(data.password, 13);
		const verificationOTP = Math.round(Math.random() * 1000000).toString();
		const user = await prisma.user.create({
			data: {
				...data,
				password,
				verificationOTP,
				profilePic: "",
				coverPic: "",
				about: ""
			}
		});

		// const mailOptions = {
		// 	from: "webops@shaastra.org",
		// 	to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
		// 	subject: "Verify Your Email | Shaastra Prime",
		// 	html: `<p>Your verification code for Shaastra Prime is <strong>${verificationOTP}</strong> </p>`
		// };

		if (!!user) {
			// await sendgrid.send(mailOptions);
			req.session!.userId = user.id;
		}
		return !!user;
	}

	@Query(() => [User])
	async getUsers() {
		return prisma.user.findMany();
	}

	@Mutation(() => User, { nullable: true })
	async login(
		@Arg("data") { rollNumber, password }: LoginInput,
		@Ctx() { req }: GraphQLContext
	) {
		const user = await prisma.user.findOne({ where: { rollNumber } });
		if (!user) return null;

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;

		req.session!.userId = user.id;
		return user;
	}

	@FieldResolver(() => [Department])
	async departments(@Root() { id }: User) {
		return prisma.user.findOne({ where: { id } }).departments();
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;
		if (!id) return null;

		return prisma.user.findOne(id);
	}

	@Authorized()
	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: GraphQLContext) {
		return new Promise((resolve, reject) => {
			req.session!.destroy((err) => {
				if (err) reject(false);
				else {
					res.clearCookie("qid");
					resolve(true);
				}
			});
		});
	}

	@Mutation(() => Boolean)
	async verifyUser(@Arg("data") { rollNumber, otp }: VerifyUserInput) {
		let user = await prisma.user.findOne({ where: { rollNumber } });

		if (!user) return false;
		else {
			if (user.verificationOTP !== otp) return false;
			await prisma.user.update({
				where: { rollNumber },
				data: { verified: true }
			});
			return true;
		}
	}

	@Mutation(() => Boolean)
	async sendPasswordOTP(@Arg("rollNumber") rollNumber: string) {
		const user = await prisma.user.findOne({ where: { rollNumber } });
		if (!user) return false;

		const passwordOTP = Math.round(Math.random() * 1000000).toString();
		await prisma.user.update({ where: { rollNumber }, data: { passwordOTP } });

		// const mailOptions = {
		// 	from: "webops@shaastra.org",
		// 	to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
		// 	subject: "Reset Your Password | Shaastra Prime",
		// 	html: `<p>Your password reset code for Shaastra Prime is <strong>${otp}</strong> </p>`
		// };

		// await sendgrid.send(mailOptions);

		return true;
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("data") { rollNumber, passwordOTP, newPassword }: ForgotPasswordInput
	) {
		const user = await prisma.user.findOne({ where: { rollNumber } });
		if (user && user.passwordOTP === passwordOTP) {
			const password = await bcrypt.hash(newPassword, 13);
			await prisma.user.update({ where: { rollNumber }, data: { password } });
			return true;
		} else return false;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.update({
			where: { id },
			data: { profilePic }
		});
		return !!user;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async uploadCoverPic(
		@Arg("coverPic") coverPic: string,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.update({
			where: { id },
			data: { coverPic }
		});
		return !!user;
	}
}
