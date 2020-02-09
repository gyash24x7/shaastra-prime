import { InputType, Field } from "type-graphql";

@InputType()
export class ForgotPasswordInput {
	@Field()
	rollNumber: string;

	@Field()
	newPassword: string;

	@Field()
	passwordOTP: string;
}
