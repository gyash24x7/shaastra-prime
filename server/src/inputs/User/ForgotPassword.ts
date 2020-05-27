import { Field, InputType } from "type-graphql";

@InputType("ForgotPasswordInput")
export class ForgotPasswordInput {
	@Field()
	email: string;

	@Field()
	newPassword: string;

	@Field()
	passwordOTP: string;
}
