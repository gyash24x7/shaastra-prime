import { Field, InputType } from "type-graphql";

@InputType("LoginInput")
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}
