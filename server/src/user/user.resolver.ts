import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthUser } from "../auth/auth-user.decorator";
import { AuthService } from "../auth/auth.service";
import { UserGuard } from "../auth/user.guard";
import { CreateUserInput, LoginInput } from "./user.inputs";
import { UserType } from "./user.type";

@Resolver(UserType)
export class UserResolver {
	constructor(private readonly authService: AuthService) {}

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
}
