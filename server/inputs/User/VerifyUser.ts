import { InputType, Field } from "type-graphql";

@InputType()
export class VerifyUserInput {
	@Field()
	rollNumber: string;

	@Field()
	otp: string;
}
