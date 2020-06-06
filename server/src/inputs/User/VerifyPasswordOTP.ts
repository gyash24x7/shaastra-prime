import { Field, InputType } from "type-graphql";

@InputType("VerifyPasswordOTPInput")
export class VerifyPasswordOTPInput {
	@Field()
	email: string;

	@Field()
	passwordOTP: string;
}
