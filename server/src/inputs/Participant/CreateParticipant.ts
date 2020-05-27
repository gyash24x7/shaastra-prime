import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsExistingParticipant } from "../../utils/isExistingParticipant";

@InputType("CreateParticipantInput")
export class CreateParticipantInput {
	@Field()
	name: string;

	@Field()
	@IsEmail()
	@IsExistingParticipant({ message: "Participant Already Exists!" })
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
