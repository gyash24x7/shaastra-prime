import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
	@Field()
	rollNumber: string;

	@Field()
	password: string;
}
