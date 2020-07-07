import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsMobilePhone, Matches, MinLength } from "class-validator";

@InputType("CreateUserInput")
export class CreateUserInput {
	@Field() name: string;
	@Field() @IsEmail(undefined, { message: "Invalid Email!" }) email: string;
	@Field() @MinLength(8, { message: "Password too short!" }) password: string;
	@Field() department: string;

	@Field()
	@Matches(/^[A-Z]{2}[0-9]{2}[A-Z][0-9]{3}$/, {
		message: "Invalid Roll Number!"
	})
	rollNumber: string;

	@Field()
	@IsMobilePhone("en-IN", undefined, { message: "Invalid Mobile Number" })
	mobile: string;
}

@InputType("UpdatePasswordInput")
export class UpdatePasswordInput {
	@Field() @IsEmail(undefined, { message: "Invalid Email!" }) email: string;
	@Field() @MinLength(8, { message: "Password too short!" }) password: string;
}

@InputType("LoginInput")
export class LoginInput {
	@Field() @IsEmail(undefined, { message: "Invalid Email!" }) email: string;
	@Field() @MinLength(8, { message: "Password too short!" }) password: string;
}

@InputType("VerifyPasswordOTPInput")
export class VerifyPasswordOTPInput {
	@Field() @IsEmail(undefined, { message: "Invalid Email!" }) email: string;
	@Field() passwordOTP: string;
}
