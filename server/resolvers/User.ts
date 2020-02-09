import {
	Mutation,
	Arg,
	Resolver,
	Query,
	FieldResolver,
	Root,
	Ctx,
	Authorized
} from "type-graphql";
import { CreateUserInput } from "../inputs/User/CreateUser";
import { LoginInput } from "../inputs/User/Login";
import { User } from "../models/User";
import { Department } from "../models/Department";
import bcrypt from "bcryptjs";
import { GraphQLContext } from "../utils";
import { sendgrid } from "../utils/sendgrid";
import { VerifyUserInput } from "../inputs/User/VerifyUser";
import { ForgotPasswordInput } from "../inputs/User/ForgotPassword";

@Resolver(User)
export class UserResolver {
	@Mutation(() => User)
	async createUser(@Arg("data") data: CreateUserInput) {
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

		await sendgrid.send(mailOptions);
		return user;
	}

	@Authorized()
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

		if (!user.verified) return null;

		req.session!.userId = user.id;
		return user;
	}

	@FieldResolver(() => Department)
	async department(@Root() { departmentId }: User) {
		return Department.findOne(departmentId);
	}

	@Authorized()
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

	@Mutation(() => User, { nullable: true })
	async verifyUser(@Arg("data") { rollNumber, otp }: VerifyUserInput) {
		let user = await User.findOne({
			where: { rollNumber, otp, verified: false }
		});
		if (!user) return null;
		else {
			user.verified = true;
			return user.save();
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
}
