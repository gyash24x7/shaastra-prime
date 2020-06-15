import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { RegistrationType } from "../utils";

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

@InputType("CreateRegistrationInput")
export class CreateRegistrationInput {
	@Field(() => RegistrationType) type: RegistrationType;
	@Field() eventID: string;
	@Field() pId?: string;
	@Field() teamId?: string;
}

@InputType("UpdateParticipantInput")
export class UpdateParticipantInput {
	@Field()
	name: string;

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
