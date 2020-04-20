import { Field, InputType } from "type-graphql";

@InputType()
export class ForgotPasswordInput {
	@Field()
	email: string;

	@Field()
	newPassword: string;

	@Field()
	passwordOTP: string;
}
