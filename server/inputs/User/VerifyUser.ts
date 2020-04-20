import { Field, InputType } from "type-graphql";

@InputType()
export class VerifyUserInput {
	@Field()
	email: string;

	@Field()
	otp: string;
}
