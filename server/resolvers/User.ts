import bcrypt from "bcryptjs";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";

import { CreateUserInput } from "../inputs/User/CreateUser";
import { ForgotPasswordInput } from "../inputs/User/ForgotPassword";
import { LoginInput } from "../inputs/User/Login";
import { VerifyUserInput } from "../inputs/User/VerifyUser";
import { Department } from "../models/Department";
import { User } from "../models/User";
import { GraphQLContext } from "../utils";
import { sendgrid } from "../utils/sendgrid";

@Resolver(User)
export class UserResolver {
	@Mutation(() => Boolean)
	async createUser(
		@Arg("data") data: CreateUserInput,
		@Ctx() { req }: GraphQLContext
	) {
		const password = await bcrypt.hash(data.password, 13);
		const verificationOTP = Math.round(Math.random() * 1000000).toString();
		const user = await User.create({
			...data,
			password,
			verificationOTP
		}).save();

		const mailOptions = {
			from: "webops@shaastra.org",
			to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
			subject: "Verify Your Email | Shaastra Prime",
			html: `<p>Your verification code for Shaastra Prime is <strong>${verificationOTP}</strong> </p>`
		};

		if (!!user) {
			await sendgrid.send(mailOptions);
			req.session!.userId = user.id;
		}
		return !!user;
	}

	@Query(() => [User])
	async getUsers() {
		return User.find();
	}

	@Mutation(() => User, { nullable: true })
	async login(
		@Arg("data") { rollNumber, password }: LoginInput,
		@Ctx() { req }: GraphQLContext
	) {
		const user = await User.findOne({ where: { rollNumber } });
		if (!user) return null;

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;

		req.session!.userId = user.id;
		return user;
	}

	@FieldResolver(() => Department)
	async department(@Root() { departmentId }: User) {
		return Department.findOne(departmentId);
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;
		if (!id) return null;

		return User.findOne(id);
	}

	@Authorized()
	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: GraphQLContext) {
		return new Promise((resolve, reject) => {
			req.session!.destroy(err => {
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
		let user = await User.findOne({ where: { rollNumber } });

		if (!user) return false;
		else {
			if (user.verificationOTP !== otp) return false;
			user.verified = true;
			await user.save();
			return true;
		}
	}

	@Mutation(() => Boolean)
	async sendPasswordOTP(@Arg("rollNumber") rollNumber: string) {
		const user = await User.findOne({ where: { rollNumber } });
		if (!user) return false;

		const otp = Math.round(Math.random() * 1000000).toString();
		user.passwordOTP = otp;
		await user.save();

		const mailOptions = {
			from: "webops@shaastra.org",
			to: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
			subject: "Reset Your Password | Shaastra Prime",
			html: `<p>Your password reset code for Shaastra Prime is <strong>${otp}</strong> </p>`
		};

		await sendgrid.send(mailOptions);

		return true;
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("data") { rollNumber, passwordOTP, newPassword }: ForgotPasswordInput
	) {
		const user = await User.findOne({ where: { rollNumber, passwordOTP } });
		if (!user) return false;

		const password = await bcrypt.hash(newPassword, 13);
		user.password = password;
		await user.save();

		return true;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { req }: GraphQLContext
	) {
		const userId = req.session!.userId;
		const { affected } = await User.update(userId, { profilePic });
		return affected === 1;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async uploadCoverPic(
		@Arg("coverPic") coverPic: string,
		@Ctx() { req }: GraphQLContext
	) {
		const userId = req.session!.userId;
		const { affected } = await User.update(userId, { coverPic });
		return affected === 1;
	}
}
