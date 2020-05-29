import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType("CreateParticipantInput")
export class CreateParticipantInput {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;

	@Field()
	@Length(10, 10)
	mobile: string;

	@Field()
	gender: string;

	@Field()
	college: string;

	@Field()
	city: string;

	@Field()
	state: string;
}
