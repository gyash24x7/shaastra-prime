import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthUser } from "../auth/auth-user.decorator";
import { AuthService } from "../auth/auth.service";
import { UserGuard } from "../auth/user.guard";
import {
	CreateUserInput,
	LoginInput,
	UpdatePasswordInput,
	VerifyPasswordOTPInput
} from "./user.inputs";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver(UserType)
export class UserResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Mutation(() => [String])
	async createUser(@Args("data", ValidationPipe) data: CreateUserInput) {
		return await this.authService.signUpAsPrimeUser(data);
	}

	@Mutation(() => [String])
	async login(@Args("data", ValidationPipe) data: LoginInput) {
		return await this.authService.loginAsPrimeUser(data);
	}

	@Query(() => UserType)
	@UseGuards(UserGuard)
	me(@AuthUser() user: User) {
		return user;
	}

	@Mutation(() => String)
	@UseGuards(UserGuard)
	async verifyUser(
		@Args("otp") otp: string,
		@AuthUser() { verificationOTP, id }: User
	) {
		if (verificationOTP === otp) {
			await this.userService.verifyUser(id);
			return id;
		}
		return "";
	}

	@Mutation(() => Boolean)
	async updatePassword(
		@Args("data", ValidationPipe) data: UpdatePasswordInput
	) {
		await this.userService.updatePassword(data);
		return true;
	}

	@Mutation(() => Boolean)
	async getPasswordOTP(@Args("email") email: string) {
		await this.userService.sendPasswordOTP(email);
		return true;
	}

	@Mutation(() => Boolean)
	async verifyPasswordOTP(@Args("data") data: VerifyPasswordOTPInput) {
		return await this.userService.verifyPasswordOTP(data);
	}
}
