import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
	CreateUserInput,
	ForgotPasswordInput,
	LoginInput,
	VerifyPasswordOTPInput
} from "../inputs/User";
import { User } from "../models/User";
import { GraphQLContext } from "../utils";

@Resolver()
export class UserResolver {
	@Mutation(() => [String])
	async createUser(@Arg("data") data: CreateUserInput) {
		const user = await User.create({
			...data
		}).save();

		let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

		return [token, ""];
	}

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

	@Mutation(() => Boolean)
	async getPasswordOTP(
		@Arg("email") email: string,
		@Ctx() { mailjet }: GraphQLContext
	) {
		let user = await User.findOne({ where: { email } });
		if (!user) return false;

		const passwordOTP = Math.floor(100000 + Math.random() * 900000).toString();
		user.passwordOTP = passwordOTP;
		user = await user.save();

		await mailjet.post("send", { version: "v3" }).request({
			FromEmail: "prime@shaastra.org",
			FromName: "Shaastra Prime Bot",
			Recipients: [
				{
					Email: `${user.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
					Name: user.name
				}
			],
			Subject: "Reset Your Password | Shaastra Prime",
			"Html-part": `<p>Your password reset code for Shaastra Prime is <strong>${passwordOTP}</strong> </p>`,
			"Text-part": `Your password reset code for Shaastra Prime is ${passwordOTP}`
		});

		return true;
	}

	@Query(() => [User])
	async getUsers() {
		return User.find();
	}

	@Authorized()
	@Query(() => User)
	async getUser(@Arg("userId") userId: string) {
		return User.findOne(userId);
	}

	@Mutation(() => [String], { nullable: true })
	async login(@Arg("data") { email, password }: LoginInput) {
		let user = await User.findOne({ where: { email } });
		if (!user) return null;

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

		return [token, user.verified ? user.id : ""];
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { user }: GraphQLContext) {
		return user;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async uploadCoverPic(
		@Arg("coverPic") coverPic: string,
		@Ctx() { user }: GraphQLContext
	) {
		const updatedUser = await User.update(user.id, { coverPic });
		return !!updatedUser;
	}

	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { user }: GraphQLContext
	) {
		const updatedUser = await User.update(user.id, { profilePic });
		return !!updatedUser;
	}

	@Mutation(() => Boolean)
	async verifyPasswordOTP(
		@Arg("data") { email, passwordOTP }: VerifyPasswordOTPInput
	) {
		const user = await User.findOne({ where: { email } });
		return !!(user?.passwordOTP === passwordOTP);
	}

	@Authorized()
	@Mutation(() => String, { nullable: true })
	async verifyUser(@Arg("otp") otp: string, @Ctx() { user }: GraphQLContext) {
		if (user?.verificationOTP !== otp) return null;

		const updatedUser = await User.update(user.id, { verified: true });

		return updatedUser ? user.id : null;
	}
}
