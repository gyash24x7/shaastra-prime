import { Field, InputType } from "type-graphql";

@InputType("VerifyUserInput")
export class VerifyUserInput {
	@Field()
	email: string;

	@Field()
	otp: string;
}
