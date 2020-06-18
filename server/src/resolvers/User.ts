import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Department } from "../entities/Department";
import { User } from "../entities/User";
import {
	CreateUserInput,
	LoginInput,
	UpdatePasswordInput,
	VerifyPasswordOTPInput
} from "../inputs/User";
import { GraphQLContext } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver()
export class UserResolver {
	@Mutation(() => [String])
	async createUser(@Arg("data") data: CreateUserInput) {
		const user = await User.create({ ...data }).save();
		let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		return [token, ""];
	}

	@Mutation(() => Boolean)
	async updatePassword(@Arg("data") data: UpdatePasswordInput) {
		const password = await bcrypt.hash(data.newPassword, 13);
		let user = await User.findByEmail(data.email);
		user.password = password;
		user = await User.save(user);
		return !!user;
	}

	@Mutation(() => Boolean)
	async getPasswordOTP(@Arg("email") email: string) {
		let user = await User.findByEmail(email);
		user.passwordOTP = User.generateOTP();
		user = await User.save(user);
		await User.sendMail({
			rollNumber: user.rollNumber,
			name: user.name,
			htmlPart: `<p>Your password reset code for Shaastra Prime is <strong>${user.passwordOTP}</strong> </p>`,
			subject: "Reset Your Password | Shaastra Prime"
		});
		return true;
	}

	@Query(() => [User])
	async getUsers(@Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, User);
		return User.find({ select, relations });
	}

	@Authorized()
	@Query(() => User)
	async getUser(@Arg("userId") userId: string, @Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, User);
		return User.findOne(userId, { select, relations });
	}

	@Mutation(() => [String], { nullable: true })
	async login(@Arg("data") { email, password }: LoginInput) {
		let user = await User.findByEmail(email, ["password", "id", "verified"]);
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new Error("Invalid Password!");
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
		@Ctx() { user: { id } }: GraphQLContext
	) {
		const { affected } = await User.update(id, { coverPic });
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { user: { id } }: GraphQLContext
	) {
		const { affected } = await User.update(id, { profilePic });
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async verifyPasswordOTP(
		@Arg("data") { email, passwordOTP }: VerifyPasswordOTPInput
	) {
		const user = await User.findByEmail(email, ["passwordOTP"]);
		return !!(user?.passwordOTP === passwordOTP);
	}

	@Authorized()
	@Mutation(() => String)
	async verifyUser(@Arg("otp") otp: string, @Ctx() { user }: GraphQLContext) {
		if (user?.verificationOTP !== otp) throw new Error("Invalid OTP!");
		await User.update(user.id, { verified: true });
		return user.id;
	}

	@FieldResolver()
	async department(@Root() { department, departmentId }: User) {
		if (department) return department;
		return Department.findOne(departmentId);
	}
}
