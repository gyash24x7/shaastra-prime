import bcrypt from "bcryptjs";
import graphqlFields from "graphql-fields";
import jwt from "jsonwebtoken";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import {
	CreateUserInput,
	LoginInput,
	UpdatePasswordInput,
	VerifyPasswordOTPInput
} from "../inputs/User";
import { UserRepository } from "../repositories/User";
import { GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class UserResolver {
	@InjectRepository()
	private readonly userRepo: UserRepository;

	@Mutation(() => [String])
	async createUser(@Arg("data") data: CreateUserInput) {
		const user = await this.userRepo.save({ ...data });
		let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		return [token, ""];
	}

	@Mutation(() => Boolean)
	async updatePassword(@Arg("data") data: UpdatePasswordInput) {
		const password = await bcrypt.hash(data.newPassword, 13);
		let user = await this.userRepo.findByEmail(data.email);
		if (!user) return false;

		user.password = password;
		user = await this.userRepo.save(user);
		return !!user;
	}

	@Mutation(() => Boolean)
	async getPasswordOTP(@Arg("email") email: string) {
		let user = await this.userRepo.findByEmail(email);
		user.passwordOTP = this.userRepo.generateOTP();
		user = await this.userRepo.save(user);

		await this.userRepo.sendMail({
			rollNumber: user.rollNumber,
			name: user.name,
			htmlPart: `<p>Your password reset code for Shaastra Prime is <strong>${user.passwordOTP}</strong> </p>`,
			subject: "Reset Your Password | Shaastra Prime"
		});

		return true;
	}

	@Query(() => [User])
	async getUsers(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.userRepo
		);
		return this.userRepo.find({ select, relations });
	}

	@Authorized()
	@Query(() => User)
	async getUser(@Arg("userId") userId: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.userRepo
		);

		return this.userRepo.findOne(userId, { select, relations });
	}

	@Mutation(() => [String], { nullable: true })
	async login(@Arg("data") { email, password }: LoginInput) {
		let user = await this.userRepo.findByEmail(email, [
			"password",
			"id",
			"verified"
		]);

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
		const { affected } = await this.userRepo.update(id, { coverPic });
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async uploadProfilePic(
		@Arg("profilePic") profilePic: string,
		@Ctx() { user: { id } }: GraphQLContext
	) {
		const { affected } = await this.userRepo.update(id, { profilePic });
		return affected === 1;
	}

	@Mutation(() => Boolean)
	async verifyPasswordOTP(
		@Arg("data") { email, passwordOTP }: VerifyPasswordOTPInput
	) {
		const user = await this.userRepo.findByEmail(email, ["passwordOTP"]);
		return !!(user?.passwordOTP === passwordOTP);
	}

	@Authorized()
	@Mutation(() => String)
	async verifyUser(@Arg("otp") otp: string, @Ctx() { user }: GraphQLContext) {
		if (user?.verificationOTP !== otp) throw new Error("Invalid OTP!");
		await this.userRepo.save({ id: user.id, verified: true });
		return user.id;
	}
}
