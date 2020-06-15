import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType("CreateUserInput")
export class CreateUserInput {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;

	@Field()
	@Length(8, 8)
	rollNumber: string;

	@Field()
	@Length(10, 10)
	mobile: string;

	@Field()
	departmentId: string;
}

@InputType("ForgotPasswordInput")
export class ForgotPasswordInput {
	@Field()
	email: string;

	@Field()
	newPassword: string;
}

@InputType("LoginInput")
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType("VerifyPasswordOTPInput")
export class VerifyPasswordOTPInput {
	@Field()
	email: string;

	@Field()
	passwordOTP: string;
}
